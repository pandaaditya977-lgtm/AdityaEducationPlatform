# Project Requirements Document (PRD)
## EduConnect — Online Tutoring & Learning Platform

**Version:** 1.0
**Date:** September 17, 2026
**Stack:** React.js (frontend) · Node.js + Express.js (backend) · PostgreSQL + Prisma ORM (database)

---

## 1. Project Overview

EduConnect is a full-stack education platform that connects students with verified, experienced teachers, delivers structured learning content (notes, videos, shorts), and evaluates performance through tests and quizzes, with a reward system that gamifies learning. The platform also offers location-based tutor discovery for students who prefer in-person or hybrid tutoring.

### 1.1 Vision
To become a one-stop platform where a student can find the right teacher, learn through curated content, get tested, and get rewarded — all in one seamless, animated, responsive experience.

### 1.2 Goals
- Reduce the friction of finding a subject-matter-qualified, verified teacher.
- Provide structured digital content delivery (notes, long-form video, short-form "reels" style educational content).
- Enable objective skill assessment via tests/quizzes with instant, AI-assisted feedback.
- Motivate consistent learning through a reward/gamification system.
- Support both remote and local/in-person learning via location services.

---

## 2. Stakeholders & User Roles

| Role | Description |
|---|---|
| **Student** | Registers, browses/gets allotted teachers, consumes notes/videos, takes tests/quizzes, earns rewards |
| **Teacher** | Registers with credentials, gets verified, gets allotted to students, uploads notes/videos, creates tests |
| **Admin** | Approves teacher verification, manages allotment, moderates content, oversees reports/analytics |
| **Guest/Visitor** | Views landing page, course catalog previews, submits Contact Us form |

---

## 3. Functional Requirements

### 3.1 Authentication & Registration
- FR-1.1: Users can register as Student or Teacher with email/phone + password.
- FR-1.2: Email/OTP verification on signup.
- FR-1.3: Login via email/password; support "Forgot Password" via OTP/email link.
- FR-1.4: Social login (Google) — optional Phase 2.
- FR-1.5: JWT-based session with refresh tokens; role-based access control (RBAC).
- FR-1.6: Teacher registration requires additional fields: qualifications, subjects, experience, certificates (file upload), ID proof for verification.

### 3.2 Contact Us
- FR-2.1: Public contact form (name, email, phone, subject, message) → stored in DB + emailed to admin.
- FR-2.2: Auto-acknowledgement email to the sender.
- FR-2.3: Admin dashboard to view/respond to/close queries.

### 3.3 Teacher Allotment
- FR-3.1: Student selects subject(s)/grade/board and preferences (language, budget, mode: online/offline).
- FR-3.2: System suggests matching verified teachers (rule-based first, AI-assisted ranking later).
- FR-3.3: Student can request a specific teacher; Admin/auto-engine confirms allotment based on availability.
- FR-3.4: Teacher can accept/reject allotment requests within a time window.
- FR-3.5: Reallotment/change-teacher workflow if mismatch occurs.
- FR-3.6: Allotment history visible to student, teacher, and admin.

### 3.4 Online Notes Distribution
- FR-4.1: Teachers upload notes (PDF/DOC/images) tagged by subject, chapter, grade.
- FR-4.2: Students access notes only for subjects/teachers they are allotted to (access control).
- FR-4.3: Downloadable and in-browser viewer (PDF.js) support.
- FR-4.4: Versioning — teacher can update notes; students notified of updates.

### 3.5 Online Video & Shorts
- FR-5.1: Teachers/Admin upload long-form lecture videos (cloud storage + CDN streaming).
- FR-5.2: "Shorts" module — vertical short-form educational clips (≤60s), swipeable feed (Reels/TikTok-style).
- FR-5.3: Video progress tracking (resume-where-left-off), watch history.
- FR-5.4: Likes/bookmarks/comments on videos and shorts (moderated).

### 3.6 Online Tests & Quiz Format
- FR-6.1: Teachers/Admin create tests: MCQ, true/false, short answer, and timed quiz format.
- FR-6.2: Auto-grading for objective questions; AI-assisted grading for subjective/short-answer.
- FR-6.3: Timer, question shuffling, negative marking (configurable), and instant result screen.
- FR-6.4: Performance analytics per student (strengths/weak topics) shown as charts.
- FR-6.5: Quiz leaderboard per test/topic.

### 3.7 Reward System
- FR-7.1: Points awarded for: test scores, quiz streaks, video completion, consistency (daily login streak).
- FR-7.2: Badges/levels (e.g., Bronze/Silver/Gold learner) based on cumulative performance.
- FR-7.3: Redeemable rewards (discount on next allotment, certificates, unlockable content) — configurable by Admin.
- FR-7.4: Public/opt-in leaderboard.

### 3.8 Location Services
- FR-8.1: Students can search for nearby teachers/tutoring centers using geolocation (Google Maps API).
- FR-8.2: Teachers set service radius / in-person availability zone.
- FR-8.3: Map view + list view of nearby matches with distance and ratings.

### 3.9 Teacher Verification ("Professional Tutorial Services")
- FR-9.1: Document upload (degree, ID, experience letters) reviewed by Admin before "Verified" badge.
- FR-9.2: Rating & review system from students post-session/course completion.
- FR-9.3: Teacher profile: bio, subjects, experience, rating, sample videos, availability calendar.

### 3.10 AI Features
- FR-10.1: AI chatbot for student doubt-solving / FAQ (subject-scoped).
- FR-10.2: AI-based teacher recommendation ranking (based on subject match, ratings, past performance fit).
- FR-10.3: AI-generated personalized study plan based on quiz/test weak areas.
- FR-10.4: AI-assisted auto-grading for subjective answers with feedback comments.
- FR-10.5: AI content summarizer — auto-generate short notes/summary from uploaded lecture notes or video transcripts.

### 3.11 Admin Panel
- FR-11.1: Manage users (students, teachers), approve/reject teacher verification.
- FR-11.2: Manage allotments, content moderation, view Contact Us queries.
- FR-11.3: Analytics dashboard: active users, test attempts, revenue (if paid plans), top teachers.

---

## 4. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | Page load < 2.5s on 4G; API response < 300ms for standard queries |
| **Scalability** | Support horizontal scaling of backend; DB indexing/pagination for large datasets |
| **Security** | Password hashing (bcrypt/argon2), JWT with short-lived access + refresh tokens, HTTPS everywhere, input validation, rate-limiting, RBAC |
| **Availability** | 99.5% uptime target |
| **Responsiveness** | Fully responsive (mobile, tablet, desktop) — mobile-first for shorts/video |
| **Accessibility** | WCAG 2.1 AA where feasible (alt text, keyboard nav, contrast) |
| **Usability** | Smooth micro-animations/transitions (Framer Motion) without hurting performance |
| **Maintainability** | Modular codebase, documented APIs (Swagger/OpenAPI), typed backend (TypeScript recommended) |
| **Data Privacy** | GDPR-style consent for minors' data, parental consent flag if under 18 in some regions |

---

## 5. Assumptions & Constraints

- Video hosting/streaming will use a third-party service (e.g., Cloudflare Stream, AWS S3 + CloudFront, or Mux) rather than self-hosted streaming infra.
- AI features will call an external LLM API (e.g., Claude API) rather than training custom models initially.
- Location services depend on a maps provider (Google Maps Platform) — has usage-based billing.
- Payment/subscription handling is out of scope unless confirmed (see open questions).

---

## 6. Open Questions (need your input — see final section of chat response)

1. Target audience (school grade levels, competitive exam prep, or all ages)?
2. Is this free, subscription-based, or pay-per-session/teacher?
3. Branding: name, logo, color palette, tone (playful vs. professional)?
4. Teacher verification: manual admin review or third-party background-check integration?
5. Video hosting budget/preference (AWS, Cloudflare, Mux, YouTube-embed)?
6. Do you need a mobile app later (React Native) — should APIs be designed mobile-ready from day 1?
7. Expected initial scale (number of users/teachers) to size infra correctly?
