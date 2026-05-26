from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Dict

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

FEATURE_COLUMNS = [
    "sprint_velocity",
    "task_completion_rate",
    "team_utilization",
    "days_remaining",
]
LABEL_COLUMN = "risk_label"
LABELS = ["LOW", "MODERATE", "HIGH"]
LABEL_TO_INT = {label: idx for idx, label in enumerate(LABELS)}
INT_TO_LABEL = {idx: label for label, idx in LABEL_TO_INT.items()}
STATUS_MAP = {
    "LOW": "On Track",
    "MODERATE": "Moderate Risk",
    "HIGH": "At Risk - Review Sprint Plan",
}

DEFAULT_DATASET_PATH = Path(__file__).resolve().parents[1] / "data" / "sprint_velocity.csv"


@dataclass
class ModelArtifacts:
    model: Pipeline
    labels: Dict[int, str]
    model_type: str


@dataclass
class PredictionResult:
    delay_probability: int
    status: str
    risk_level: str


def ensure_dataset(path: Path, rows: int = 500, seed: int = 42) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        return path

    df = generate_synthetic_dataset(rows=rows, seed=seed)
    df.to_csv(path, index=False)
    return path


def generate_synthetic_dataset(rows: int = 500, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)

    sprint_velocity = rng.integers(10, 80, size=rows)
    task_completion_rate = rng.integers(40, 100, size=rows)
    team_utilization = rng.integers(60, 100, size=rows)
    days_remaining = rng.integers(1, 15, size=rows)

    df = pd.DataFrame(
        {
            "sprint_velocity": sprint_velocity,
            "task_completion_rate": task_completion_rate,
            "team_utilization": team_utilization,
            "days_remaining": days_remaining,
        }
    )

    df[LABEL_COLUMN] = df.apply(_derive_label, axis=1)
    return df


def _derive_label(row: pd.Series) -> str:
    if row["sprint_velocity"] > 50 and row["task_completion_rate"] > 80 and row["team_utilization"] < 85:
        label = "LOW"
    elif (
        30 <= row["sprint_velocity"] <= 50
        and 60 <= row["task_completion_rate"] <= 80
        and 85 <= row["team_utilization"] <= 95
    ):
        label = "MODERATE"
    else:
        label = "HIGH"

    if row["days_remaining"] <= 3 and label != "HIGH":
        label = "HIGH" if label == "MODERATE" else "MODERATE"

    return label


def train_model(data_path: Path, model_type: str = "logreg", seed: int = 42) -> ModelArtifacts:
    df = pd.read_csv(data_path)
    missing_cols = [col for col in FEATURE_COLUMNS + [LABEL_COLUMN] if col not in df.columns]
    if missing_cols:
        raise ValueError(f"Missing columns in dataset: {', '.join(missing_cols)}")

    X = df[FEATURE_COLUMNS]
    y = df[LABEL_COLUMN].map(LABEL_TO_INT)
    if y.isna().any():
        raise ValueError("Dataset contains unknown labels.")

    model_type = model_type.lower().strip()
    if model_type == "rf":
        model = RandomForestClassifier(n_estimators=200, random_state=seed)
        pipeline: Pipeline = Pipeline([("model", model)])
    else:
        model = LogisticRegression(max_iter=1000, multi_class="multinomial")
        pipeline = Pipeline([("scaler", StandardScaler()), ("model", model)])
        model_type = "logreg"

    pipeline.fit(X, y)
    return ModelArtifacts(model=pipeline, labels=INT_TO_LABEL, model_type=model_type)


def predict_with_model(
    artifacts: ModelArtifacts,
    sprint_velocity: float,
    task_completion_rate: float,
    team_utilization: float,
    days_remaining: int,
) -> PredictionResult:
    features = np.array(
        [[sprint_velocity, task_completion_rate, team_utilization, days_remaining]],
        dtype=float,
    )

    predicted_index = int(artifacts.model.predict(features)[0])
    probabilities = artifacts.model.predict_proba(features)[0]

    high_probability = int(round(float(probabilities[LABEL_TO_INT["HIGH"]]) * 100))
    risk_level = artifacts.labels[predicted_index]
    status = STATUS_MAP[risk_level]

    return PredictionResult(
        delay_probability=max(1, min(99, high_probability)),
        status=status,
        risk_level=risk_level,
    )
