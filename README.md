# Internal Operations Service Hub

The Internal Operations Service Hub provides a service-request lifecycle, full-stack request flow, AI-assisted request intake, and production deployment verification.

## Live Application

https://internal-operations-service-hub-oqzr.onrender.com

Health endpoint:

```text
https://internal-operations-service-hub-oqzr.onrender.com/health
```

## Install

```bash
npm install
```

## Environment

Create a `.env` file in the project root based on `.env.example`.

```env
REQUESTY_API_KEY=your_requesty_api_key
DATABASE_URL=
PORT=3000
RELEASE_SHA=
FORCE_NOT_READY=false
```

When `DATABASE_URL` is empty, local development uses SQLite.

Production uses PostgreSQL through `DATABASE_URL`.

Secrets are not committed to Git.

## Run Locally

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

## AI-Assisted Intake

Employees can enter a free-text request and use AI Assist before creating a request.

The AI suggests:

- category: `IT`, `HR`, or `UNKNOWN`
- summary
- whether clarification is required

AI output is advisory. The backend validates allowed product values and remains authoritative.

## Request Lifecycle

The implemented lifecycle is:

```text
SUBMITTED -> IN_PROGRESS -> COMPLETED
```

The current bounded authorization rule permits IT actors in the IT department to perform the implemented status transitions.

## Tests

Run the automated tests:

```bash
npm test
```

Run the production build:

```bash
npm run build
```

## AI Evaluations

Run the AI evaluation set with:

```bash
npm run eval:ai
```

The evaluation set covers clear, thin, ambiguous, mixed-context, invalid-output, and provider-failure cases.

## Release Verification

Run the complete release gate with:

```bash
npm run release:check
```

This runs the automated tests, production build, and AI evaluations in one repeatable command.

## Documentation

AI capability and evaluation evidence:

```text
docs/week4-production-ai.md
```

Deployment, health-check, failure-recovery, and production-verification evidence:

```text
docs/week5-release-operations.md
```