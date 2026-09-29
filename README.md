# Internal Operations Service Hub

**Student Name: Sindy Tauk**

The Internal Operations Service Hub is a full-stack internal service-request application that supports request intake, AI-assisted classification, request lifecycle handling, authorization boundaries, persistent state, and production operations.

## Live Application

Live app:

https://internal-operations-service-hub-oqzr.onrender.com

Health endpoint:

https://internal-operations-service-hub-oqzr.onrender.com/health

The application is deployed on Render. Production data is stored in PostgreSQL.

> The free Render instance may take a short time to wake up after inactivity.

## Demo Access and Roles

No username or password is required for the current bounded demo.

The UI provides an **Actor Department** selector used to demonstrate the implemented authorization boundary:

- `IT` - authorized to perform the implemented request status transitions.
- `HR` - used to demonstrate a rejected unauthorized transition.

The current implementation is a bounded internal-service-hub slice and does not implement a complete company identity or authentication system.

## Critical Live User Journey

Use the live UI to verify the main product flow:

1. Open the live application.
2. Enter a free-text internal request, for example:

   `My laptop cannot connect to the office Wi-Fi.`

3. Select **AI Assist**.
4. Review the AI suggestion:
   - category
   - summary
   - clarification requirement
5. Use the AI-generated summary if desired.
6. Create the request.
7. Confirm that the request is created with status `SUBMITTED`.
8. Refresh or reload the request and confirm that it remains available.
9. Select actor department `IT`.
10. Move the request from `SUBMITTED` to `IN_PROGRESS`.
11. Move the request from `IN_PROGRESS` to `COMPLETED`.
12. Refresh again and confirm that the completed state remains available.

This journey verifies the frontend, backend, AI-assisted intake, authorization rule, lifecycle behavior, and PostgreSQL persistence.

## Boundary and Rejected Action

The implemented lifecycle is:

```text
SUBMITTED -> IN_PROGRESS -> COMPLETED
```

The current bounded authorization rule permits IT actors in the IT department to perform the implemented status transitions.

To verify the rejected case:

1. Create or load a request in `SUBMITTED`.
2. Select actor department `HR`.
3. Attempt to start work on the request.
4. The backend rejects the action and the request remains in its last confirmed state.

AI output is advisory and does not make lifecycle, authorization, or final request decisions.

## AI-Assisted Intake

Employees can enter a free-text request and request an AI suggestion before creating the request.

The AI returns:

- `category`: `IT`, `HR`, or `UNKNOWN`
- `summary`
- `needsClarification`

The backend validates the AI result before it can be used.

Unclear, insufficient, or mixed IT/HR requests may return:

```text
category: UNKNOWN
needsClarification: true
```

Invalid provider output is rejected, and provider failure does not bypass product-owned rules.

## Engineer Quick Start

### Prerequisites

The project was developed and verified with:

- Git
- Node.js 22 LTS
- npm

### Clone

```bash
git clone https://github.com/sindyy-lovable/internal-operations-service-hub.git
cd internal-operations-service-hub
```

### Install

```bash
npm ci
```

### Configure Environment

Create a `.env` file in the project root based on `.env.example`.

```env
REQUESTY_API_KEY=your_requesty_api_key
DATABASE_URL=
PORT=3000
RELEASE_SHA=
FORCE_NOT_READY=false
```

Set `REQUESTY_API_KEY` to a valid Requesty API key to use the live AI provider.

When `DATABASE_URL` is empty, local development uses SQLite.

Production uses PostgreSQL through `DATABASE_URL`.

Secrets are not committed to Git. The safe environment template is available in:

[.env.example](.env.example)

### Run Locally

Start the NestJS backend:

```bash
npm run start:dev
```

In a second terminal, start the React frontend:

```bash
npm run start:ui
```

The backend runs on:

```text
http://localhost:3000
```

The frontend is served by Parcel, normally at:

```text
http://localhost:1234
```

No external PostgreSQL database is required for the default local SQLite configuration.

## Verification

### Automated Tests

Run:

```bash
npm test
```

The automated test suite covers lifecycle behavior, authorization rules, invalid requests, persistence integration, and the user-facing request flow.

E2E coverage is included in the automated test suite.

### Production Build

Run:

```bash
npm run build
```

### AI Evaluations

Run:

```bash
npm run eval:ai
```

The AI evaluation set covers:

1. Clear IT request
2. Clear HR request
3. Thin input
4. Ambiguous input
5. Mixed IT and HR request
6. Invalid AI provider output
7. AI provider failure

### Release Gate

Run the complete release verification command:

```bash
npm run release:check
```

This executes:

```text
automated tests -> production build -> AI evaluations
```

The release gate provides one repeatable command for final verification.

## Operations

### Health and Readiness

The application exposes:

```text
GET /health
```

Live health endpoint:

https://internal-operations-service-hub-oqzr.onrender.com/health

A healthy production release returns:

```json
{
  "status": "ok",
  "database": "ok",
  "release": "<deployed Git commit SHA>"
}
```

The `release` field identifies the exact Git commit running in production.

### Logs and Signals

Production application logs are available to the operator through the Render web-service **Logs** page.

Render also provides service metrics for operational inspection.

The `/health` endpoint provides the primary application readiness signal and verifies database connectivity.

### Controlled Failure and Recovery

A controlled readiness-failure switch is available through:

```text
FORCE_NOT_READY=true
```

This was used only to verify failure and recovery behavior.

During the controlled failure, `/health` reports a degraded state.

Recovery is performed by restoring:

```text
FORCE_NOT_READY=false
```

and restarting or redeploying the service.

After recovery, verify:

```text
status: ok
database: ok
```

Then repeat the critical request flow to confirm that the application remains operational after recovery.

The verified failure and recovery evidence is documented in:

[Week 5 Release and Operations](docs/week5-release-operations.md)

## Evidence Map

The repository keeps the evidence from each Academy stage directly accessible:

- [Product Specification](docs/product-spec.md) - product problem, requirements, constraints, unknowns, and acceptance criteria.
- [Architecture](docs/architecture.md) - components, boundaries, flows, external dependencies, reliability, and architecture decisions.
- [Data Model](docs/data-model.md) - domain concepts, relationships, lifecycle rules, storage, and access patterns.
- [ADR-001](decisions/ADR-001.md) - request-state and request-history architecture decision.
- [Week 2 Agentic Workflow](docs/week2-agentic-workflow.md) - bounded lifecycle implementation and proof.
- [Week 3 Full-Stack Delivery](docs/week3-full-stack-delivery.md) - UI, API contract, persistence, authorization, integration, and E2E evidence.
- [Week 4 Production AI](docs/week4-production-ai.md) - AI capability, product authority, conditional behavior, and evaluation evidence.
- [Week 5 Release and Operations](docs/week5-release-operations.md) - deployment, health, persistence, production verification, failure, and recovery evidence.

Architecture diagram:

[Architecture Diagram](docs/architecture-diagram.png.jpeg)

## Current Product Boundaries

The implemented release intentionally remains bounded.

It does not attempt to provide:

- a complete enterprise authentication or identity system;
- every possible HR or IT request category;
- complete multi-department routing rules;
- department-specific approval workflows that have not been defined;
- advanced CI/CD or observability infrastructure;
- AI authority over lifecycle, authorization, or final business decisions.

The current release focuses on a complete, verifiable critical path rather than unnecessary scope expansion.