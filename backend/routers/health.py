from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime, timedelta

router = APIRouter()

# Sample health data for demonstration purposes
SAMPLE_HEALTH_DATA = [
    {"date": "2023-10-01", "weight": 70, "activity": 120, "sleep": 7},
    {"date": "2023-10-02", "weight": 70.5, "activity": 90, "sleep": 6.5},
    {"date": "2023-10-03", "weight": 71, "activity": 100, "sleep": 8},
    # Add more sample data...
]

@router.get("/health/data")
async def get_health_data(
    time_range: Optional[int] = Query(7, description="Time range in days (7, 30, 90)")
):
    """Fetch health data filtered by time range and return in frontend-expected structure."""
    try:
        end_date = datetime.now()
        start_date = end_date - timedelta(days=time_range)

        filtered_data = [
            entry for entry in SAMPLE_HEALTH_DATA
            if start_date <= datetime.strptime(entry["date"], "%Y-%m-%d") <= end_date
        ]

        activityData = [
            {"date": entry["date"], "value": entry["activity"]}
            for entry in filtered_data
        ]
        weightData = [
            {"date": entry["date"], "value": entry["weight"]}
            for entry in filtered_data
        ]
        sleepData = [
            {"date": entry["date"], "value": entry["sleep"]}
            for entry in filtered_data
        ]
        # Générer les alertes comme dans l'autre endpoint
        alerts = []
        for entry in filtered_data:
            if entry["weight"] > 75:
                alerts.append({"message": "Poids au-dessus de la normale", "severity": "high", "date": entry["date"]})
            if entry["activity"] < 60:
                alerts.append({"message": "Activité faible détectée", "severity": "medium", "date": entry["date"]})
            if entry["sleep"] < 6:
                alerts.append({"message": "Sommeil insuffisant", "severity": "medium", "date": entry["date"]})

        return {
            "activityData": activityData,
            "weightData": weightData,
            "sleepData": sleepData,
            "alerts": alerts
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching health data: {str(e)}")

@router.get("/health/alerts")
async def get_health_alerts():
    """Fetch health alerts based on metrics."""
    try:
        alerts = []
        for entry in SAMPLE_HEALTH_DATA:
            if entry["weight"] > 75:
                alerts.append({"type": "weight", "message": "Weight exceeds healthy range", "date": entry["date"]})
            if entry["activity"] < 60:
                alerts.append({"type": "activity", "message": "Low activity detected", "date": entry["date"]})
            if entry["sleep"] < 6:
                alerts.append({"type": "sleep", "message": "Insufficient sleep", "date": entry["date"]})

        return {"alerts": alerts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching health alerts: {str(e)}")
