# Week 5 Release and Operations

## Deployment

The Internal Operations Service Hub is deployed on Render as a Node web service.

Live URL:

https://internal-operations-service-hub-oqzr.onrender.com

The production database is a Render PostgreSQL instance in the Frankfurt (EU Central) region.

## Build and Start

Build command:

```bash
npm ci && npm run build
```

Start command:

```bash
npm run start:prod
```
## Environment Configuration

The deployed service uses these environment variables:

- `DATABASE_URL` - internal Render PostgreSQL connection URL
- `REQUESTY_API_KEY` - AI provider API key
- `FORCE_NOT_READY=false` - controlled readiness-failure switch used for verification

Secrets are configured in Render and are not committed to the repository.
## Health Check

The application exposes:

```text
GET /health
```

A healthy deployment returns:

```json
{
  "status": "ok",
  "database": "ok",
  "release": "<deployed Git commit SHA>"
}
```

The `release` field identifies the Git commit currently deployed by Render.
## Production Verification

The deployed application was verified through the live UI:

1. AI-assisted intake classified a laptop Wi-Fi request as `IT`.
2. The AI returned a structured summary with no clarification required.
3. The request was created successfully.
4. The request remained available after browser refresh, confirming PostgreSQL persistence.
5. The request transitioned from `SUBMITTED` to `IN_PROGRESS`.
6. The request transitioned from `IN_PROGRESS` to `COMPLETED`.
7. The completed state remained available after another refresh.
## Failure and Recovery

Two controlled failure scenarios were verified.

### Authorization Failure

An `HR` actor attempted to move a request from `SUBMITTED` to `IN_PROGRESS`.

The backend rejected the transition and the request remained in `SUBMITTED`.

Recovery was verified by changing the actor to `IT` and retrying the same transition successfully.

### Readiness Failure

The application was started with:

```text
FORCE_NOT_READY=true
```

The `/health` endpoint returned a degraded state.

After removing the failure flag and restarting the application normally, `/health` returned:

```text
status: ok
database: ok
```

The critical request flow remained operational after recovery.