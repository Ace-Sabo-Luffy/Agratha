# 🎉 AGRATHA - LIVE APP FLOW DEMO

## 1️⃣ USER LANDS ON APP

```
Visit: http://localhost:5173
↓
App loads with navbar
↓
Not logged in? See: [Login] [Register] buttons
```

---

## 2️⃣ REGISTRATION FLOW

```
User clicks "Register"
↓
Page: /register
Form Fields:
  - Full Name: "Raj Kumar"
  - Email: "raj@college.com"
  - Password: "****"
  - Role: [Participant v] or [Admin v]
↓
Clicks "Register"
↓
Firebase creates account
Backend creates user in MongoDB
↓
Redirected to Dashboard (/dashboard for participant, /admin for admin)
```

---

## 3️⃣ PARTICIPANT VIEW (Student)

### Dashboard (/dashboard)
```
Header: My Dashboard
┌─────────────────┐
│ Registered      │ = 0 events
│ Events          │
└─────────────────┘

┌─────────────────┐
│ Teams           │ = 0 teams
│ Joined          │
└─────────────────┘

┌─────────────────┐
│ Results         │ = 0
│ Posted          │
└─────────────────┘

Section: My Registrations
"Your event registrations will appear here"
```

### Events Page (/events)
```
Header: Events
Filter Buttons: [All] [Technical] [Cultural] [Sports]

Cards Grid:
┌─────────────────────┐  ┌─────────────────────┐
│ Coding War          │  │ Dance Battle        │
│ Learn and compete   │  │ Show your moves     │
│ Category: Technical │  │ Category: Cultural  │
│ Max: 50 people      │  │ Max: 100 people     │
│ [View Details]      │  │ [View Details]      │
└─────────────────────┘  └─────────────────────┘

(More events cards...)
```

### Leaderboard Page (/leaderboard)
```
Header: Leaderboard
Select Event: [Coding War v]

Rank │ Name          │ Team       │ Score
─────┼───────────────┼────────────┼──────
  1  │ Raj Kumar     │ DevSlayers │ 950
  2  │ Priya Singh   │ CodeForce  │ 920
  3  │ Amit Patel    │ Solo       │ 850
  4  │ Sarah Jones   │ TechKnights│ 800

"No results available yet"
```

### Announcements Page (/announcements)
```
Header: Announcements

📌 PINNED
━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 Fest Starts Tomorrow!
May 8, 2025
Get ready for the biggest fest! 
Registration closes at 5 PM.

━━━━━━━━━━━━━━━━━━━━━━━━━
📋 New Events Added
May 7, 2025
3 new cultural events added. Check them out!
```

---

## 4️⃣ ADMIN VIEW (Organizer)

### Admin Dashboard (/admin)
```
Tabs: [Events] [Registrations] [Results] [Announcements]

EVENTS Tab:
┌──────────────────────────────────┐
│ Create New Event                 │
│ [+ Add Event Button]             │
│                                  │
│ Existing Events:                 │
│ • Coding War - 45/50 registered  │
│ • Dance Battle - 89/100          │
│ [Edit] [Delete] [View]           │
└──────────────────────────────────┘

REGISTRATIONS Tab:
┌──────────────────────────────────┐
│ Event: [Coding War v]            │
│                                  │
│ Name      │ Email         │ Team │
│ Raj Kumar │ raj@col.com   │ Dev  │
│ Priya     │ priya@col.com │ Code │
│ Amit      │ amit@col.com  │ -    │
│                                  │
│ [Export as CSV]                  │
└──────────────────────────────────┘

RESULTS Tab:
┌──────────────────────────────────┐
│ Event: [Coding War v]            │
│ Participant: [Raj Kumar v]       │
│ Score: [950]                     │
│ Rank: [1]                        │
│ [Submit Results] [Update]        │
└──────────────────────────────────┘

ANNOUNCEMENTS Tab:
┌──────────────────────────────────┐
│ Title: [Event Postponed    ]     │
│ Content: [Large text area  ]     │
│ ☐ Pin this announcement          │
│ [Post] [Cancel]                  │
└──────────────────────────────────┘
```

---

## 5️⃣ NAVIGATION FLOW

### Not Logged In (Public)
```
🎉 Agratha
┌─────────────────────────────────────┐
│ [Events] [Announcements] [Leaderboard]
│                    [Login] [Register]
└─────────────────────────────────────┘
```

### Logged In as Participant
```
🎉 Agratha
┌──────────────────────────────────────────────────┐
│ [Events] [Announcements] [Leaderboard]
│                  [My Dashboard]
│                           [Logout]
└──────────────────────────────────────────────────┘
```

### Logged In as Admin
```
🎉 Agratha
┌──────────────────────────────────────────────────┐
│ [Events] [Announcements] [Leaderboard]
│        [Admin Panel] [Logout]
└──────────────────────────────────────────────────┘
```

---

## 6️⃣ AUTHENTICATION FLOW

```
User Registration/Login
        ↓
Firebase Auth (email/password)
        ↓
Backend receives Firebase token
        ↓
Backend verifies token
        ↓
Create/fetch user from MongoDB
        ↓
Frontend stores token in browser
        ↓
All API requests include token
        ↓
Protected routes check role (admin/participant)
        ↓
Access granted/denied based on role
```

---

## 7️⃣ DATA FLOW EXAMPLE

### Participant Registers for Event

```
1. User clicks "View Details" on an event card
   ↓
2. EventDetailsPage opens
   ↓
3. User clicks "Register"
   ↓
4. Frontend sends: POST /api/registrations
   {
     eventID: "64a1b2c3d4e5f6g7h8i9",
     participantID: "user123",
     teamID: null
   }
   ↓
5. Backend creates Registration document in MongoDB
   ↓
6. Returns confirmation: { ticketURL: "..." }
   ↓
7. Frontend shows "Registration Successful!"
   ↓
8. User can download ticket PDF
   ↓
9. Event now appears in ParticipantDashboard
```

---

## 8️⃣ RESPONSIVE DESIGN

### Mobile (375px)
```
┌──────────────┐
│ 🎉 Agratha   │
├──────────────┤
│ [Events    ] │
│ [Announce] │
│ [Board     ] │
│ [Dashboard] │
│ [Logout    ] │
├──────────────┤
│              │
│ Events Grid  │
│ (Single Col) │
│              │
└──────────────┘
```

### Tablet (768px)
```
┌────────────────────────────┐
│ 🎉 Agratha                 │
│ [Events] [Announce] [Board]│
│            [Dashboard]     │
├────────────────────────────┤
│ Events Grid (2 columns)    │
└────────────────────────────┘
```

### Desktop (1920px)
```
┌─────────────────────────────────────────────┐
│ 🎉 Agratha                                  │
│ [Events] [Announce] [Board] [Dashboard]     │
│                                  [Logout]   │
├─────────────────────────────────────────────┤
│ Events Grid (3 columns)                     │
└─────────────────────────────────────────────┘
```

---

## 🚀 TO RUN THIS DEMO

### Prerequisites
1. **Install Node.js** from https://nodejs.org/ (v16+)
2. **Set up Firebase** - Create free account at https://firebase.google.com/
3. **Set up MongoDB** - Create free cluster at https://www.mongodb.com/cloud/atlas

### Steps
```bash
# 1. Setup environment
cp .env.example .env
# Edit .env with your Firebase and MongoDB credentials

# 2. Install dependencies
cd frontend && npm install
cd ../backend && npm install

# 3. Terminal 1 - Frontend
cd frontend
npm run dev
# Visit: http://localhost:5173

# 4. Terminal 2 - Backend
cd backend
npm run dev
# Server runs: http://localhost:5000
```

### First Steps in App
1. Click "Register" → Create account as "participant"
2. Browse events in "Events" page
3. View "Announcements"
4. Check "Leaderboard"
5. Try "Admin" account → See admin panel
6. Post announcement → See it on announcements page

---

## ✨ KEY FEATURES TO TEST

✅ Auth (login/register with different roles)
✅ Role-based navigation (different menus for admin/participant)
✅ Event filtering (by category)
✅ Event registration flow
✅ Admin dashboard tabbed interface
✅ Leaderboard with rankings
✅ Announcements with pinning
✅ Responsive design (mobile/tablet/desktop)
✅ Protected routes (try accessing /admin as participant - redirects)
✅ Logout functionality

---

This is your complete app architecture! 🎉
All pages are ready. Next phase: Connect backend APIs to make it fully functional.
