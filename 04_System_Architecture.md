# System Architecture Document
## EduConnect Platform

**Version:** 1.0

---

## 1. Deployment Topology

```
                              ┌────────────────────┐
                              │       CDN            │
                              │ (static assets, video │
                              │  thumbnails, shorts)  │
                              └─────────┬────────────┘
                                        │
 ┌───────────────┐   HTTPS    ┌────────▼─────────┐
 │  React SPA     │───────────▶│   Load Balancer   │
 │ (static hosted │            │  / Nginx Reverse   │
 │  on Vercel/    │            │      Proxy         │
 │  Netlify/S3)   │            └────────┬───────────┘
 └───────────────┘                     │
                          ┌────────────┼────────────┐
                          │            │             │
                   ┌──────▼─────┐┌─────▼──────┐┌─────▼──────┐
                   │  API Node  ││  API Node  ││  API Node  │  (horizontally
                   │  Instance 1││  Instance 2││  Instance N│   scaled, PM2/
                   └──────┬─────┘└─────┬──────┘└─────┬──────┘   Docker + K8s)
                          │            │             │
              ┌───────────┴────────────┴─────────────┘
              │
     ┌────────▼─────────┐   ┌──────────────┐   ┌───────────────────┐
     │   PostgreSQL       │   │    Redis      │   │  Object Storage    │
     │ (Primary + Read     │   │ (cache, queue,│   │ (S3/R2 — notes,    │
     │  Replica for scale) │   │  sessions)    │   │  videos, docs)      │
     └────────────────────┘   └──────────────┘   └───────────────────┘
              │
     ┌────────▼─────────┐
     │  Background Workers │  (BullMQ consumers: video transcode,
     │  (Node.js processes) │   email, AI jobs, reward recalculation)
     └────────────────────┘

External Services: Claude API (AI), Google Maps Platform (location),
                    Email provider (SendGrid/SES), Video transcoding (Mux/Cloudflare Stream)
```

---

## 2. Component Responsibilities

| Component | Responsibility |
|---|---|
| **React SPA** | UI rendering, client-side routing, state management, calls REST/WebSocket APIs |
| **Nginx / Load Balancer** | SSL termination, request routing, rate limiting, static asset caching |
| **API Nodes (Express)** | Business logic, auth, validation, orchestration across DB/cache/external APIs |
| **PostgreSQL** | System of record — users, allotments, tests, rewards, content metadata |
| **Redis** | Session/token blacklist store, leaderboard sorted sets, job queue backing store, cache layer |
| **Object Storage (S3/R2)** | Durable storage for uploaded notes, raw & transcoded videos, teacher documents |
| **Background Workers** | Async, non-blocking work: transcoding triggers, emails, AI calls, reward computation |
| **CDN** | Fast global delivery of static frontend build + video/thumbnail assets |
| **Claude API** | Chatbot, grading assistance, recommendations, summarization |
| **Google Maps Platform** | Geocoding, distance calculation, map rendering |

---

## 3. Data Flow Example — "Student takes a quiz"

1. React app requests `GET /api/tests/:id` → Nginx → API node.
2. API node authenticates JWT, checks student is allotted to the test's teacher/subject.
3. Prisma fetches `Test` + `Question` + `Option` (options' `isCorrect` flag stripped before sending to client).
4. Student submits `POST /api/tests/:id/attempt` with answers.
5. API node grades objective questions synchronously; for subjective ones, pushes a job to the `ai-grading` BullMQ queue and returns a "pending" partial result immediately.
6. Worker picks up the job, calls Claude API, writes suggested grade + confidence back to `AnswerResponse`.
7. Socket.io emits `attempt:graded` event to the student when finalized; Reward Module is triggered in the same worker pipeline.
8. Redis leaderboard (`ZADD`) updated; frontend receives live update via Socket.io if the leaderboard view is open.

---

## 4. Environments

| Environment | Purpose | Notes |
|---|---|---|
| **Local** | Developer machines | Docker Compose spins up Postgres + Redis locally |
| **Staging** | QA / UAT | Mirrors production config at smaller scale |
| **Production** | Live | Auto-scaling API nodes, DB backups, monitoring/alerting |

---

## 5. Scalability Considerations

- **Stateless API nodes** — session state lives in Redis/JWT, not in-process, so any node can serve any request → horizontal scaling behind the load balancer.
- **DB read replicas** for read-heavy endpoints (catalog browsing, leaderboards) once traffic grows.
- **CDN + object storage** offloads all large binary delivery (video/notes) away from the API layer entirely.
- **Queue-based AI/video processing** prevents slow third-party calls from ever blocking user-facing request threads.
- **Modular monolith boundaries** mean the `content` (video/notes) or `ai` module can be extracted into its own service first, since they're the most resource-intensive.

## 6. Monitoring & Observability

- Application logs → structured JSON (pino) → shipped to a log aggregator (e.g., Grafana Loki / Datadog).
- Metrics: request latency, error rate, queue depth (BullMQ dashboard), DB connection pool usage.
- Uptime/health-check endpoint (`/healthz`) polled by the load balancer and an external uptime monitor.
- Error tracking via Sentry (frontend + backend) for real-time exception alerts.

## 7. Backup & Disaster Recovery

- Automated daily PostgreSQL backups (point-in-time recovery enabled).
- Object storage versioning enabled on buckets holding teacher documents/notes.
- Infrastructure-as-code (Docker Compose for local, Terraform for cloud resources if you scale to a dedicated cloud setup) so environments are reproducible.
