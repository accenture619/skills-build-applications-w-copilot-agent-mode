# OctoFit Tracker

A modern multi-tier fitness tracking application built with React 19, Node.js/Express, and MongoDB.

## 📋 Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite + TypeScript application
├── backend/           # Node.js + Express + TypeScript API
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB running on `mongodb://localhost:27017`

### Setup

1. **Start MongoDB** (if not already running):
   ```bash
   mongod
   ```

2. **Frontend Setup**:
   ```bash
   cd octofit-tracker/frontend
   npm install
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

3. **Backend Setup** (in a new terminal):
   ```bash
   cd octofit-tracker/backend
   npm install
   npm run dev
   ```
   Backend will be available at `http://localhost:8000`

## 🔧 Configuration

### Ports

- **Frontend**: 5173 (Vite dev server)
- **Backend**: 8000 (Express API)
- **MongoDB**: 27017 (Default MongoDB port)

### Frontend Proxy

The Vite dev server is configured to proxy `/api` requests to the backend:
- Requests to `http://localhost:5173/api/*` are forwarded to `http://localhost:8000/*`

### Database

- MongoDB Database Name: `octofit-tracker`
- Connection String: `mongodb://localhost:27017/octofit-tracker`

## 📦 Dependencies

### Frontend

- **react**: ^19.0.0
- **react-dom**: ^19.0.0
- **vite**: ^5.4.0
- **typescript**: ^5.6.0

### Backend

- **express**: ^4.18.2
- **mongoose**: ^8.0.0
- **cors**: ^2.8.5
- **typescript**: ^5.6.0

## 🔌 API Endpoints

- `GET /` - Welcome message with API info
- `GET /health` - Health check endpoint

## 📝 Next Steps

- [ ] Flesh out API routes and data models (Mongoose schemas)
- [ ] Add authentication if required
- [ ] Implement frontend pages and API integration
- [ ] Add user management
- [ ] Add workout tracking features
- [ ] Add progress monitoring

## 📄 License

ISC
