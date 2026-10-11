from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import requests
import os
from dotenv import load_dotenv

load_dotenv()

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

API_KEY = os.getenv("FOOTBALL_API_KEY")
BASE_URL = "https://api.football-data.org/v4"
HEADERS = {"X-Auth-Token": API_KEY}

LIGAS_PERMITIDAS = {
    "PL", "PD", "BL1", "SA", "FL1",
    "CL", "ELC", "PPL", "DED", "BSA", "EC", "WC"
}

@app.get("/standings/{competition_code}")
@limiter.limit("30/minute")
def get_standings(request: Request, competition_code: str):
    if competition_code not in LIGAS_PERMITIDAS:
        raise HTTPException(status_code=400, detail="Liga no permitida")
    
    url = f"{BASE_URL}/competitions/{competition_code}/standings"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 403:
        raise HTTPException(status_code=403, detail="Liga no disponible en tu plan")
    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Liga no encontrada")
    if response.status_code == 429:
        raise HTTPException(status_code=429, detail="Demasiadas solicitudes, esperá un momento")
    if not response.ok:
        raise HTTPException(status_code=500, detail="Error al obtener datos de fútbol")
    
    return response.json()

@app.get("/matches/{competition_code}")
@limiter.limit("30/minute")
def get_matches(request: Request, competition_code: str):
    if competition_code not in LIGAS_PERMITIDAS:
        raise HTTPException(status_code=400, detail="Liga no permitida")
    
    url = f"{BASE_URL}/competitions/{competition_code}/matches?status=FINISHED"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 403:
        raise HTTPException(status_code=403, detail="Liga no disponible en tu plan")
    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Liga no encontrada")
    if response.status_code == 429:
        raise HTTPException(status_code=429, detail="Demasiadas solicitudes, esperá un momento")
    if not response.ok:
        raise HTTPException(status_code=500, detail="Error al obtener datos de fútbol")
    
    return response.json()