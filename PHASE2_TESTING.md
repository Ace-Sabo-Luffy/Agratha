# Phase 2 Implementation - Testing Guide

## What's Been Implemented

✅ **Backend Setup**
- Firebase Admin SDK initialized (`backend/src/config/firebase.js`)
- Auth middleware fixed to fetch user from DB (`backend/src/middleware/auth.js`)
- Validation utilities created (`backend/src/utils/validation.js`)
- All routes properly wired in server

✅ **Core API Routes (8 endpoints)**

### Users Routes (`/api/users`)
- `POST /register` - Create user after Firebase signup
- `GET /profile` - Get logged-in user profile
- `PUT /:id` - Update user profile
- `GET /:id` - Get user by ID (public)

### Events Routes (`/api/events`)
- `GET /` - List all published events (with category filtering)
- `POST /` - Create event (admin only)
- `GET /:id` - Get event details
- `PUT /:id` - Update event (admin + creator only)
- `DELETE /:id` - Delete event (admin + creator only)

### Registrations Routes (`/api/registrations`)
- `GET /` - Get user's registrations
- `POST /` - Register for event (with capacity check)
- `GET /:eventId` - Get all registrations for event (admin only)
- `PUT /:id` - Cancel registration

### Announcements Routes (`/api/announcements`)
- `GET /` - Get all announcements (sorted by pinned + date)
- `POST /` - Create announcement (admin only)
- `PUT /:id` - Update announcement (admin + creator only)
- `DELETE /:id` - Delete announcement (admin + creator only)

### Leaderboard Route (`/api/leaderboard`)
- `GET /:eventId` - Get rankings for event (sorted by score)

---

## Setup Before Testing

### 1. Get Firebase Credentials

1. Go to https://console.firebase.google.com/
2. Create a new project or use existing
3. Go to Project Settings → Service Accounts
4. Click "Generate New Private Key"
5. Copy the JSON content

### 2. Fill .env Files

**Backend `.env`** (in `backend/` directory):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agratha
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...
```

**Frontend `.env`** (in `frontend/` directory):
```env
VITE_FIREBASE_API_KEY=your_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

### 3. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

---

## Testing Checklist

### Test 1: Server Starts
```bash
cd backend
npm run dev
```
Expected output:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

### Test 2: Health Check (in browser or Postman)
```
GET http://localhost:5000/api/health
```
Expected:
```json
{
  "status": "Server running",
  "timestamp": "2026-05-08T..."
}
```

### Test 3: User Registration
```bash
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "firebaseUID": "test-uid-123",
  "email": "test@example.com",
  "name": "Test User",
  "role": "participant"
}
```
Expected: 201 Created with user data

### Test 4: Create Event (As Admin)
```bash
# First, register as admin with different firebaseUID
POST /api/users/register
{
  "firebaseUID": "admin-uid-123",
  "email": "admin@example.com",
  "name": "Admin User",
  "role": "admin"
}

# Then create event (need Firebase token from admin)
POST /api/events
Authorization: Bearer {adminFirebaseToken}
Content-Type: application/json

{
  "name": "Coding War",
  "description": "Competitive programming event",
  "category": "technical",
  "maxParticipants": 50,
  "minTeamSize": 1,
  "maxTeamSize": 3
}
```
Expected: 201 Created with event data

### Test 5: List Events
```bash
GET http://localhost:5000/api/events
```
Expected: 200 with array of events

### Test 6: Get User Profile
```bash
GET http://localhost:5000/api/users/profile
Authorization: Bearer {participantFirebaseToken}
```
Expected: 200 with user profile

### Test 7: Create Announcement (As Admin)
```bash
POST /api/announcements
Authorization: Bearer {adminFirebaseToken}
Content-Type: application/json

{
  "title": "Fest Starts Tomorrow",
  "content": "Get ready for the biggest fest!",
  "isPinned": true
}
```
Expected: 201 Created

### Test 8: Get Announcements
```bash
GET http://localhost:5000/api/announcements
```
Expected: 200 with announcements array (pinned first)

### Test 9: Register for Event
```bash
POST /api/registrations
Authorization: Bearer {participantFirebaseToken}
Content-Type: application/json

{
  "eventID": "{eventId from Test 4}",
  "teamID": null
}
```
Expected: 201 Created with registration

### Test 10: Get User Registrations
```bash
GET /api/registrations
Authorization: Bearer {participantFirebaseToken}
```
Expected: 200 with array of user's registrations

---

## Testing Tools

### Option 1: Postman
Download: https://www.postman.com/downloads/
- Create new requests
- Set Authorization → Bearer Token
- Copy Firebase ID token from browser console

### Option 2: Thunder Client (VS Code Extension)
- Install "Thunder Client" extension in VS Code
- Use same structure as Postman

### Option 3: CLI with curl
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"firebaseUID":"test","email":"test@test.com","name":"Test","role":"participant"}'
```

---

## Get Firebase Tokens for Testing

In browser DevTools Console:
```javascript
import { auth } from './config/firebase.js'
auth.currentUser.getIdToken().then(token => console.log(token))
```

Or use this in frontend:
```javascript
const token = await auth.currentUser.getIdToken()
console.log(token)
```

---

## Common Issues & Fixes

### "MongoDB connected" doesn't appear
- Check MONGODB_URI in .env
- Ensure MongoDB Atlas cluster is running
- Check network access in Atlas (add your IP)

### "Firebase credential error"
- Check FIREBASE_PRIVATE_KEY formatting (should have \n)
- Ensure all Firebase credentials are present
- Check private key doesn't have escape quotes

### "User not found" on profile request
- Make sure user was created with POST /users/register first
- Check firebaseUID matches between Firebase and DB

### CORS errors
- Ensure frontend is on http://localhost:5173
- Backend should accept it automatically

---

## Next Steps After Testing

1. ✅ All 8 endpoints return correct data
2. ✅ Role-based authorization working (admin routes protected)
3. ✅ No console errors
4. → Start Phase 3: Implement Admin UI Components
   - Event creation form
   - Results submission form
   - Admin dashboard functional pages
   - Data export (CSV)

---

## Quick Start Commands

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev

# Browser
http://localhost:5173
```

Then register account and test all flows!
