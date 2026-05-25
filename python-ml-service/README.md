# Python FastAPI Analytics & Intelligence Service

Day 1 deliverable: FastAPI service with a dummy delay risk prediction endpoint.

## Run locally

```bash
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

## Endpoints

- GET /health
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
