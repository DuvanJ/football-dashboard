# ⚽ Football Dashboard

Dashboard interactivo de fútbol en tiempo real construido con React y FastAPI.

![Football Dashboard](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

## 🚀 Demo
> Próximamente en producción

## 📋 Descripción

Football Dashboard es una aplicación web fullstack que muestra estadísticas en tiempo real de las principales ligas de fútbol del mundo. Consume datos de la API de football-data.org y los presenta de forma visual e interactiva.

## ✨ Funcionalidades

- 📊 **Tabla de posiciones** con escudos, colores por zona (Champions, Europa, descenso)
- 📈 **Gráfica de barras** con el Top 10 de equipos por puntos
- 🏅 **Tarjetas de estadísticas** — líder, mejor ataque, mejor defensa, último lugar
- 📅 **Últimos partidos** con marcadores y escudos
- 🔄 **Auto-refresh** cada 60 segundos
- 🌍 **12 ligas disponibles** — Premier League, La Liga, Bundesliga, Serie A y más
- 📱 **Responsive** — funciona en móvil y desktop
- 🌙 **Dark mode** por defecto

## 🛠️ Tecnologías

### Frontend
- React 18
- Tailwind CSS
- Recharts
- Axios

### Backend
- FastAPI
- Python 3.10+
- SlowAPI (rate limiting)
- python-dotenv

### API
- [football-data.org](https://www.football-data.org) — plan gratuito

## ⚙️ Instalación local

### Requisitos
- Node.js 18+
- Python 3.10+

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

Creá un archivo `.env` en la carpeta `backend`:

FOOTBALL_API_KEY=tu_api_key_aquí


Corré el servidor:
```bash
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173)

## 🔒 Seguridad

- API Key protegida en variables de entorno
- Rate limiting: 30 requests/minuto por IP
- Validación de ligas permitidas
- CORS configurado

## 📁 Estructura del proyecto

footballstats/
├── backend/
│ ├── main.py
│ ├── requirements.txt
│ └── .env (no incluido)
└── frontend/
├── src/
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── StatsCards.jsx
│ │ ├── PointsChart.jsx
│ │ ├── StandingsTable.jsx
│ │ ├── RecentMatches.jsx
│ │ └── Skeleton.jsx
│ └── App.jsx
└── package.json


## 👤 Autor

**Duvan** — [GitHub](https://github.com/DuvanJ)