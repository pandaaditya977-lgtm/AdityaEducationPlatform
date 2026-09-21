# System Workflow Document
## EduConnect Platform

**Version:** 1.0

This document describes the key end-to-end user flows through the system.

---

## 1. Registration & Login Flow

```
User → [Register Form: role=Student/Teacher] → Backend validates input
     → Password hashed → User row created (status: pending if Teacher)
     → OTP/verification email sent → User verifies email
     → (If Teacher) → Uploads certificates/ID → Status = "Pending Review"
     → Admin reviews → Approves/Rejects → Teacher notified
     → User logs in → Backend issues JWT (access) + refresh token (httpOnly cookie)
     → Frontend stores access token in memory, redirects to role-based dashboard
```

**Key states (Teacher):** `Registered → Pending Verification → Verified/Rejected → Active`

---

## 2. Teacher Allotment Flow

```
Student → Selects subject/grade/board/mode/budget/preferred language
        → System queries TeacherProfile (filter: subject match, verified=true, availability)
        → (AI Module) re-ranks candidates by rating, past-student outcomes, subject-fit score
        → Student views ranked list → Sends allotment request to chosen teacher
        → Teacher receives notification (Socket.io) → Accepts / Rejects within X hours
        → If Accepted → Allotment record created (status=active) → Both notified
        → If Rejected/Timeout → Student prompted to pick next-ranked teacher
        → Ongoing: either party can request reallotment → Admin mediates if disputed
```

---

## 3. Notes Distribution Flow

```
Teacher → Uploads note file (PDF/DOC) tagged {subject, chapter, grade}
        → File streamed to Cloud Storage → Note record saved (Prisma) with storage URL
        → NoteAccess auto-granted to all students with active allotment to that teacher/subject
        → Student → Notes tab → Fetches accessible notes (access-controlled query)
        → Views in-browser (PDF.js) or downloads
        → (AI Module, optional) generates auto-summary → attached as "Quick Summary"
        → If teacher re-uploads a new version → Notification sent to students ("Note updated")
```

---

## 4. Video & Shorts Flow

```
Teacher/Admin → Uploads raw video → Queued job (BullMQ) → Transcoding (via cloud service)
              → Video record created with streaming URL + thumbnail
Student       → Browses video catalog (filtered by subject/allotment) or Shorts feed (swipeable)
              → Playback → WatchProgress updated periodically (resume support)
              → Engagement (like/bookmark/comment) → stored, comments moderated queue
              → Completion → triggers Reward Module (points for "video completed")
```

---

## 5. Test / Quiz Flow

```
Teacher/Admin → Creates Test { type: MCQ/quiz/subjective, questions[], timer, negative-marking }
Student        → Starts test → Timer begins → Questions served (optionally shuffled)
               → Submits answers → Backend auto-grades objective questions instantly
               → Subjective answers → queued to AI Module for grading suggestion
                    → Teacher reviews/overrides AI-suggested grade (human-in-the-loop)
               → Final score computed → TestAttempt record finalized
               → Result screen shown to student (score, correct/incorrect breakdown, weak topics)
               → Reward Module triggered: points added based on score/streak
               → Leaderboard updated (Redis sorted set) → real-time push via Socket.io
```

---

## 6. Reward System Flow

```
Trigger events: test completed, quiz streak maintained, video completed, daily login
              → Rewards Engine computes point delta (rule table, e.g. "score>90% => +50pts")
              → RewardPoint ledger entry created (append-only, auditable)
              → Cumulative points checked against Badge thresholds
              → If threshold crossed → Badge awarded → Frontend shows unlock animation
              → Points/badges reflected on Profile + optional public Leaderboard
```

---

## 7. Location-Based Teacher Discovery Flow

```
Student → Grants location permission (browser Geolocation API) or enters address/pincode
        → Backend queries TeacherAvailability/LocationPreference within radius
          (PostGIS distance query or Google Maps Distance Matrix as fallback)
        → Results shown as: Map view (markers, distance) + List view (sorted by distance/rating)
        → Student proceeds to standard Allotment Flow with the chosen teacher
```

---

## 8. Contact Us Flow

```
Visitor/User → Fills Contact form → Backend validates → Stores ContactQuery row
             → Auto-acknowledgement email sent to sender
             → Notification/email sent to Admin inbox
             → Admin → Views in Admin Panel → Responds → Marks Resolved
```

---

## 9. AI Chatbot (Doubt-Solving) Flow

```
Student → Opens chat widget (subject-scoped, tied to current note/video context)
        → Question sent to backend → AI Module builds prompt (context + guardrails)
        → Claude API call (queued if high load) → Response streamed back to widget
        → Conversation logged (for teacher visibility / quality review)
        → Option: "Escalate to my teacher" → Creates a flagged thread visible to the allotted teacher
```
