# Python FastAPI Analytics & Intelligence Service

Day 1 deliverable: FastAPI service with a dummy delay risk prediction endpoint.
Day 2 deliverable: ML delay risk prediction using a dummy CSV dataset.

## Run locally

```bash
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

## ML mode (Logistic Regression or Random Forest)

This service supports two prediction modes:

- RULE_BASED (default)
- ML (Logistic Regression or Random Forest)

### Dataset

This repo already includes a dummy dataset at:

- data/sprint_velocity.csv

### Train + start in ML mode

If you want to use a `.env` file, this repo includes one at the service root. Run uvicorn with `--env-file .env` so the variables are loaded.

PowerShell:

```powershell
$env:PREDICTION_MODE = "ML"
$env:ML_MODEL = "logreg"  # or "rf"
uvicorn app.main:app --reload --port 8001
```

With .env:

```powershell
uvicorn app.main:app --reload --port 8001 --env-file .env
```

CMD:

```bat
set PREDICTION_MODE=ML
set ML_MODEL=logreg
uvicorn app.main:app --reload --port 8001
```

With .env:

```bat
uvicorn app.main:app --reload --port 8001 --env-file .env
```

Training happens automatically on startup when ML mode is enabled.

## Endpoints

- GET /health
- GET /model
- POST /predict

### Example request

```json
{
  "sprint_velocity": 42,
  "task_completion_rate": 68,
  "team_utilization": 91,
  "days_remaining": 5
}
```

### Example response

```json
{
  "delay_probability": 55,
  "status": "Moderate Risk",
  "risk_level": "MODERATE"
}
```
