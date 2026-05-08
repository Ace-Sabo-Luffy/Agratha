# Agratha - College Fest Management Portal

A full-stack web application for managing college fest events, registrations, teams, and results.

## Project Structure

```
agratha/
├── frontend/          # React + Vite frontend
├── backend/           # Express.js backend
├── .env.example       # Environment variables template
└── .gitignore
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Firebase account

## Setup Instructions

### 1. Environment Setup

Copy `.env.example` to `.env` in both frontend and backend directories:

```bash
cp .env.example .env
```

Fill in your Firebase and MongoDB credentials in both `.env` files.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

### 3. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend will run on `http://localhost:5000`

## Features

### Admin Panel
- Create and manage events
- View event registrations
- Publish results and manage leaderboard
- Post announcements

### Participant Portal
- Browse and register for events
- Create or join teams
- View enrolled events and team details
- Download event tickets

### General
- Real-time announcements feed
- Event schedule and details
- Live leaderboard with rankings
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Firebase Auth
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** Firebase Auth
- **Deployment:** Vercel (frontend), Firebase/Heroku (backend)

## Database Collections

- **Users:** User profiles and authentication data
- **Events:** Event details and configurations
- **Registrations:** User event registrations
- **Teams:** Team information and members
- **Results:** Event results and rankings
- **Announcements:** Platform announcements

## API Endpoints

See the implementation plan for the complete list of API endpoints.

## Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linter

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## TODO

- [ ] Complete Phase 2: Authentication & Core Models
- [ ] Complete Phase 3: Admin Features
- [ ] Complete Phase 4: Participant Features
- [ ] Complete Phase 5: Leaderboard & Results
- [ ] Complete Phase 6: Polish & Optimization
- [ ] Deploy to production

## Contributing

Follow the existing code structure and patterns. Make sure to:
1. Test your changes locally
2. Keep components focused and modular
3. Use meaningful variable and function names
4. Update documentation as needed

## License

MIT
