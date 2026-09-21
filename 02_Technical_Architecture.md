# Technical Architecture Document
## EduConnect Platform

**Version:** 1.0

---

## 1. Architectural Style

**Modular Monolith → Microservice-ready.** Start as a single Express.js backend organized into strict domain modules (auth, users, teachers, allotment, content, tests, rewards, location, ai). Each module exposes its own routes/controllers/services and only talks to others through service interfaces — so any module (e.g., `tests` or `ai`) can be peeled out into its own microservice later without a rewrite.

Reasoning: at your stated scale, a monolith is faster to build, cheaper to deploy, and easier to reason about than microservices, while the modular boundaries protect you from "spaghetti" as it grows.

---

## 2. High-Level Component View

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│   React SPA (Vite) — Web        │   (Future) React Native    │
└───────────────────────┬───────────────────────────────────────┘
                         │ HTTPS / REST + WebSocket
┌───────────────────────▼───────────────────────────────────────┐
│                     API GATEWAY / NGINX                       │
│      (SSL termination, rate limiting, reverse proxy)          │
└───────────────────────┬───────────────────────────────────────┘
                         │
┌───────────────────────▼───────────────────────────────────────┐
│                 NODE.JS + EXPRESS.JS BACKEND                  │
│  ┌───────────┬───────────┬────────────┬───────────┬────────┐ │
│  │   Auth    │  Users/   │ Allotment  │ Content   │ Tests/ │ │
│  │  Module   │ Teachers  │  Module    │ (Notes/   │ Quiz   │ │
│  │  (JWT)    │  Module   │            │  Video)   │ Module │ │
│  ├───────────┼───────────┼────────────┼───────────┼────────┤ │
│  │  Rewards  │ Location  │  Contact   │    AI      │ Admin │ │
│  │  Module   │  Module   │  Module    │  Module    │Module │ │
│  └───────────┴───────────┴────────────┴───────────┴────────┘ │
└───────┬───────────────┬──────────────────┬────────────────────┘
        │               │                  │
┌───────▼──────┐ ┌──────▼───────┐  ┌───────▼─────────┐
│  PostgreSQL  │ │    Redis      │  │  External APIs   │
│  (Prisma ORM)│ │ (cache/queue) │  │ Claude/OpenAI,    │
│              │ │               │  │ Google Maps,      │
│              │ │               │  │ Cloud Storage/CDN │
└──────────────┘ └───────────────┘  └───────────────────┘
```

---

## 3. Frontend Architecture (React.js)

- **Build tool:** Vite (fast dev server, HMR).
- **Routing:** React Router v6 with role-protected routes (Student/Teacher/Admin layouts).
- **State management:** Redux Toolkit (or Zustand for lighter footprint) for global state (auth/user); React Query (TanStack Query) for server-state/caching of API data.
- **Styling:** Tailwind CSS for utility-first responsive design + a small design-token system (colors, spacing) for brand consistency.
- **Animation:** Framer Motion for page transitions, card hover effects, reward-unlock animations, and micro-interactions; GSAP for more complex scroll-based landing page animations.
- **Video/Shorts Player:** `video.js` or `plyr` for long-form video; a custom swipeable feed (using Framer Motion drag gestures) for shorts.
- **Forms:** React Hook Form + Zod for schema-based client-side validation (mirrors backend validation).
- **Component structure:** Atomic design (atoms/molecules/organisms) — reusable `Button`, `Card`, `Modal`, `QuizQuestion`, `TeacherCard`, `NoteViewer`, `VideoPlayer`, `ShortsFeed`, `Leaderboard`, `BadgeDisplay`.
- **Maps:** `@react-google-maps/api` for the location/nearby-teacher view.
- **PWA-ready:** Service worker for offline note access (optional Phase 2).

## 4. Backend Architecture (Node.js + Express.js)

- **Language:** TypeScript (strongly recommended) for type safety across a codebase this large.
- **Layered structure per module:** `routes → controller → service → repository (Prisma) → DB`.
- **Validation:** Zod or Joi at the controller boundary — reject bad input before it touches business logic.
- **Auth:** JWT access token (short-lived, ~15 min) + refresh token (httpOnly cookie, ~7 days) rotation; RBAC middleware (`requireRole('teacher')`, etc.).
- **File uploads:** Multer → stream directly to cloud storage (S3/Cloudflare R2), never store binaries on the app server disk.
- **Background jobs:** BullMQ + Redis for async tasks — video transcoding triggers, email sending, reward point recalculation, AI summarization jobs — so these never block API responses.
- **Real-time:** Socket.io for live features — teacher allotment notifications, quiz leaderboard live updates, chat/doubt-solving.
- **API documentation:** OpenAPI/Swagger auto-generated from route schemas.
- **Error handling:** Centralized error middleware with consistent error-response shape; structured logging (pino/winston) shipped to a log aggregator.

## 5. Database Architecture (PostgreSQL + Prisma)

- Prisma schema organized by domain; Prisma Migrate for versioned migrations.
- Key entities (detailed ER modeling would be its own diagram, high-level list below):
  - `User` (base) → `StudentProfile`, `TeacherProfile` (1:1 extensions via role)
  - `Allotment` (student ↔ teacher, subject, status, timestamps)
  - `Note`, `NoteAccess`
  - `Video`, `Short`, `WatchProgress`
  - `Test`, `Question`, `Option`, `TestAttempt`, `AnswerResponse`
  - `RewardPoint`, `Badge`, `UserBadge`
  - `TeacherAvailability`, `LocationPreference`
  - `ContactQuery`
  - `Notification`
- Use **Prisma relations + indexes** on high-traffic lookup columns (`userId`, `subjectId`, `teacherId`, geospatial columns via PostGIS extension if precise location queries are needed).
- Read-heavy endpoints (leaderboards, catalog browsing) get Redis caching with TTL invalidation.

## 6. AI Layer

- A dedicated `ai` service module wraps all LLM calls (Claude API) so prompt logic, safety filtering, and retries live in one place.
- Use-cases wired into this layer: chatbot doubt-solving, teacher-recommendation re-ranking, subjective-answer grading, note/video summarization, personalized study-plan generation.
- Async by default — AI jobs queued via BullMQ so slow LLM latency never blocks the main request/response cycle; frontend polls or receives a Socket.io event when the result is ready.
- All AI outputs affecting grades/rewards are logged for auditability (so a teacher/admin can review an AI grading decision).

## 7. Security Architecture

- HTTPS everywhere (TLS termination at Nginx/load balancer).
- Passwords hashed with argon2/bcrypt; never store plaintext.
- Helmet.js for HTTP security headers; CORS locked to known frontend origins.
- Rate limiting (express-rate-limit + Redis) on auth and AI endpoints specifically.
- File upload validation (type/size limits, virus scan hook for teacher-uploaded documents).
- RBAC enforced at both route-middleware level and Prisma query level (never trust client-supplied IDs — always scope queries to `req.user.id`/role).
- Audit logs for sensitive actions (teacher verification approval, reward adjustments, admin actions).

## 8. Responsive Design Strategy

- Mobile-first Tailwind breakpoints; shorts/video feed designed for mobile viewport first, then adapted to a wider "theater" layout on desktop.
- Fluid typography (`clamp()`), CSS grid for dashboard layouts that reflow from multi-column (desktop) to single-column (mobile).
- Touch gestures (swipe) for shorts on mobile; keyboard shortcuts (arrow keys) for the same feed on desktop.

## 9. Animation Strategy

- Page/route transitions: Framer Motion `AnimatePresence`.
- Micro-interactions: button hover/press states, card lift-on-hover, skeleton loaders while data fetches.
- Reward moments: confetti/badge-unlock animation on earning a badge or completing a test (dopamine-driven, but used sparingly to stay professional, not gimmicky).
- Scroll-triggered reveals on the marketing/landing page (GSAP ScrollTrigger).
- Respect `prefers-reduced-motion` for accessibility.
