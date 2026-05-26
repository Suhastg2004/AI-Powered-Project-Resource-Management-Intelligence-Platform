import os
from pathlib import Path
from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.ml_model import (
    DEFAULT_DATASET_PATH,
    PredictionResult,
    ensure_dataset,
    predict_with_model,
    train_model,
)

app = FastAPI(title="Project Intelligence ML Service", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PREDICTION_MODE = os.getenv("PREDICTION_MODE", "RULE_BASED").upper()
ML_MODEL_TYPE = os.getenv("ML_MODEL", "logreg").lower()
DATASET_PATH = Path(os.getenv("DATASET_PATH", str(DEFAULT_DATASET_PATH)))
MODEL_ARTIFACTS = None
MODEL_ERROR = None

if PREDICTION_MODE == "ML":
    try:
        dataset_path = ensure_dataset(DATASET_PATH)
        MODEL_ARTIFACTS = train_model(dataset_path, model_type=ML_MODEL_TYPE)
    except Exception as exc:
        MODEL_ERROR = str(exc)

class PredictionRequest(BaseModel):
    sprint_velocity: float = Field(..., ge=0)
    task_completion_rate: float = Field(..., ge=0, le=100)
    team_utilization: float = Field(..., ge=0, le=100)
    days_remaining: int = Field(..., ge=0)


class PredictionResponse(BaseModel):
    delay_probability: int
    status: str
    risk_level: Literal["LOW", "MODERATE", "HIGH"]


def rule_based_prediction(payload: PredictionRequest) -> PredictionResponse:
    # Simple rule-based logic from the project spec.
    if payload.sprint_velocity > 50 and payload.task_completion_rate > 80 and payload.team_utilization < 85:
        base_probability = 15
        risk_level = "LOW"
        status = "On Track"
    elif (
        30 <= payload.sprint_velocity <= 50
        and 60 <= payload.task_completion_rate <= 80
        and 85 <= payload.team_utilization <= 95
    ):
        base_probability = 45
        risk_level = "MODERATE"
        status = "Moderate Risk"
    else:
        base_probability = 80
        risk_level = "HIGH"
        status = "At Risk - Review Sprint Plan"

    if payload.days_remaining < 5:
        base_probability += 10

    delay_probability = max(1, min(99, int(base_probability)))
    return PredictionResponse(
        delay_probability=delay_probability,
        status=status,
        risk_level=risk_level,
    )

@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.get("/model")
def model_info() -> dict:
    return {
        "prediction_mode": PREDICTION_MODE,
        "model_type": getattr(MODEL_ARTIFACTS, "model_type", None),
        "dataset_path": str(DATASET_PATH),
        "model_ready": MODEL_ARTIFACTS is not None,
        "model_error": MODEL_ERROR,
    }


@app.post("/predict", response_model=PredictionResponse)
def predict_delay_risk(payload: PredictionRequest) -> PredictionResponse:
    if PREDICTION_MODE == "ML" and MODEL_ARTIFACTS is not None:
        result = predict_with_model(
            MODEL_ARTIFACTS,
            sprint_velocity=payload.sprint_velocity,
            task_completion_rate=payload.task_completion_rate,
            team_utilization=payload.team_utilization,
            days_remaining=payload.days_remaining,
        )
        return PredictionResponse(
            delay_probability=result.delay_probability,
            status=result.status,
            risk_level=result.risk_level,
        )

    return rule_based_prediction(payload)