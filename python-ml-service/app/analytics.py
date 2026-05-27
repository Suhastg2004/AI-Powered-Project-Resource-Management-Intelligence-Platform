from __future__ import annotations

from pathlib import Path
from typing import Optional

import pandas as pd


def load_csv(path: Path) -> pd.DataFrame:
    if not path.exists():
        raise FileNotFoundError(f"CSV not found: {path}")
    return pd.read_csv(path)


def get_delay_risk_per_project(
    projects_path: Path,
    metrics_path: Path,
    predict_fn,
) -> list[dict]:
    """Return delay risk % per project.

    predict_fn: callable that takes (velocity, completion_rate, utilization, days_remaining)
    and returns a dict-like {delay_probability, status, risk_level}.
    """

    projects = load_csv(projects_path)
    metrics = load_csv(metrics_path)

    merged = metrics.merge(projects, on="project_id", how="left")

    results: list[dict] = []
    for _, row in merged.iterrows():
        pred = predict_fn(
            float(row["sprint_velocity"]),
            float(row["task_completion_rate"]),
            float(row["team_utilization"]),
            int(row["days_remaining"]),
        )
        results.append(
            {
                "project_id": int(row["project_id"]),
                "project_name": row.get("name") if pd.notna(row.get("name")) else None,
                "status": pred["status"],
                "risk_level": pred["risk_level"],
                "delay_probability": int(pred["delay_probability"]),
            }
        )

    results.sort(key=lambda x: x["delay_probability"], reverse=True)
    return results


def get_at_risk_projects(delay_risk_rows: list[dict], threshold: int = 70) -> list[dict]:
    return [row for row in delay_risk_rows if int(row["delay_probability"]) >= threshold]


def get_sprint_velocity_trends(sprints_path: Path, project_id: Optional[int] = None) -> list[dict]:
    sprints = load_csv(sprints_path)
    if project_id is not None:
        sprints = sprints[sprints["project_id"] == project_id]

    sprints = sprints.sort_values(["project_id", "start_date"]).copy()

    rows: list[dict] = []
    for _, row in sprints.iterrows():
        rows.append(
            {
                "project_id": int(row["project_id"]),
                "sprint_name": str(row["sprint_name"]),
                "start_date": str(row["start_date"]),
                "end_date": str(row["end_date"]),
                "velocity": float(row["velocity"]),
            }
        )

    return rows


def get_developer_utilization_heatmap(util_path: Path, project_id: Optional[int] = None) -> list[dict]:
    util = load_csv(util_path)
    if project_id is not None:
        util = util[util["project_id"] == project_id]

    util = util.sort_values(["developer_name", "sprint_name"]).copy()

    rows: list[dict] = []
    for _, row in util.iterrows():
        rows.append(
            {
                "project_id": int(row["project_id"]),
                "developer_id": int(row["developer_id"]),
                "developer_name": str(row["developer_name"]),
                "sprint_name": str(row["sprint_name"]),
                "utilization_pct": float(row["utilization_pct"]),
            }
        )

    return rows
