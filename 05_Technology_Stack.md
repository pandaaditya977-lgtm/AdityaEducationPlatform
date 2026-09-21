# Technology Stack Document
## EduConnect Platform

**Version:** 1.0

---

## 1. Frontend

| Layer | Technology | Why |
|---|---|---|
| Framework | **React.js** (with **TypeScript**) | As requested; TS catches bugs early across a large codebase |
| Build tool | **Vite** | Fast dev server & builds, better DX than CRA |
| Routing | **React Router v6** | Standard, supports nested/protected routes |
| Global state | **Redux Toolkit** or **Zustand** | Predictable auth/user state |
| Server state | **TanStack Query (React Query)** | Caching, refetching, loading/error states for API data |
| Styling | **Tailwind CSS** | Utility-first, fast responsive design |
| Animation | **Framer Motion** + **GSAP** | Page transitions, micro-interactions, scroll effects |
| Forms & validation | **React Hook Form** + **Zod** | Performant forms, shared validation schema with backend |
| Video player | **video.js** / **Plyr** | Robust playback with custom controls |
| Maps | **@react-google-maps/api** | Location/nearby-teacher features |
| Charts | **Recharts** | Performance analytics, leaderboard visualizations |
| Icons | **lucide-react** | Clean, consistent icon set |
| Real-time client | **socket.io-client** | Live notifications, leaderboard updates |
| PWA (optional) | **Vite PWA plugin** | Offline note access, installability |

## 2. Backend

| Layer | Technology | Why |
|---|---|---|
| Runtime | **Node.js** (LTS) | As requested |
| Framework | **Express.js** + **TypeScript** | As requested; TS for safer, self-documenting APIs |
| ORM | **Prisma** | As requested; type-safe queries, easy migrations |
| Database | **PostgreSQL** | As requested; relational integrity for allotments/tests/rewards |
| Extension | **PostGIS** (optional) | Precise geospatial "nearby teacher" queries |
| Auth | **jsonwebtoken**, **bcrypt/argon2** | Industry-standard JWT auth + secure password hashing |
| Validation | **Zod** (shared with frontend) or **Joi** | Consistent request validation |
| File uploads | **Multer** + cloud SDK (AWS SDK / R2) | Stream uploads directly to object storage |
| Caching / Queue | **Redis** + **BullMQ** | Sessions, leaderboards, background job processing |
| Real-time | **Socket.io** | Notifications, live leaderboard, chat |
| Email | **Nodemailer** + **SendGrid/AWS SES** | OTP, notifications, contact-us acknowledgements |
| API docs | **Swagger/OpenAPI** (swagger-jsdoc) | Auto-generated, shareable API reference |
| Logging | **pino** | Fast structured logging |
| Testing | **Jest** + **Supertest** | Unit + integration testing of API endpoints |

## 3. AI Layer

| Component | Technology |
|---|---|
| LLM Provider | **Claude API (Anthropic)** — chat, grading assistance, summarization, recommendations |
| Job orchestration | **BullMQ** workers wrapping AI calls (async, retryable) |
| Prompt/response logging | Stored in PostgreSQL for auditability of AI-influenced grades |

## 4. Infrastructure & DevOps

| Component | Technology |
|---|---|
| Containerization | **Docker** + **Docker Compose** (local/staging) |
| Orchestration (at scale) | **Kubernetes** (or a managed PaaS like Render/Railway to start) |
| CI/CD | **GitHub Actions** — lint, test, build, deploy pipelines |
| Frontend hosting | **Vercel** / **Netlify** / S3+CloudFront |
| Backend hosting | **Render** / **Railway** / **AWS ECS** / **DigitalOcean App Platform** |
| Object storage & CDN | **AWS S3 + CloudFront** or **Cloudflare R2 + CDN** |
| Video transcoding/streaming | **Mux** or **Cloudflare Stream** (adaptive bitrate for lecture videos + shorts) |
| Database hosting | **Neon** / **Supabase (Postgres)** / **AWS RDS** |
| Maps | **Google Maps Platform** (Geocoding, Places, Maps JS API) |
| Monitoring | **Sentry** (errors) + **Grafana/Datadog** (metrics/logs) |
| Secrets management | **.env** locally, cloud provider's secrets manager in production |

## 5. Suggested Repository Structure

```
educonnect/
├── apps/
│   ├── client/                # React + Vite frontend
│   │   ├── src/
│   │   │   ├── components/    # atoms/molecules/organisms
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   ├── store/          # redux/zustand
│   │   │   ├── services/       # API clients (axios/fetch wrappers)
│   │   │   └── animations/
│   │   └── vite.config.ts
│   └── server/                # Express backend
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── users/
│       │   │   ├── allotment/
│       │   │   ├── content/       # notes, videos, shorts
│       │   │   ├── tests/
│       │   │   ├── rewards/
│       │   │   ├── location/
│       │   │   ├── contact/
│       │   │   └── ai/
│       │   ├── middleware/
│       │   ├── jobs/            # BullMQ workers
│       │   └── prisma/
│       │       └── schema.prisma
│       └── tsconfig.json
├── docker-compose.yml
└── .github/workflows/
```

## 6. Version Baseline (recommended at time of build)

- React 19.x, Node.js 22.x LTS, Express 5.x, Prisma 6.x, PostgreSQL 16+, Redis 7+, TypeScript 5.x

---

*Note: exact library versions should be pinned in `package.json` at project kickoff and reviewed periodically for security patches.*
