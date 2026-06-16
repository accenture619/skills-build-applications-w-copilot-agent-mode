# 🐙 OctoFit Tracker

A modern multi-tier fitness tracking application built with React 19, Vite, Express, TypeScript, and MongoDB.

## Architecture

### Frontend
- **Technology**: React 19 + Vite
- **Port**: 5173
- **Features**: Modern UI with hot module reloading

### Backend
- **Technology**: Node.js + Express + TypeScript
- **Port**: 8000
- **Database**: MongoDB (Mongoose ODM)
- **Features**: RESTful API for fitness data management

### Database
- **Technology**: MongoDB
- **Port**: 27017
- **Database Name**: octofit-tracker

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (running on localhost:27017)
- npm or yarn

### Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd octofit-tracker/backend
npm install
npm run dev
```

The API will be available at `http://localhost:8000`

### Available Backend Endpoints

- `GET /health` - Health check
- `GET /api/workouts` - Get all workouts

## Development

### Frontend
- Run: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

### Backend
- Run: `npm run dev`
- Build: `npm run build`
- Start: `npm start`
- Lint: `npm run lint`

## Project Structure

```
octofit-tracker/
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## License

ISC
