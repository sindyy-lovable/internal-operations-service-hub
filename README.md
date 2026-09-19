# Internal Operations Service Hub

This repository contains the service-request lifecycle, full-stack request flow, and AI-assisted request intake capability.

## Install

```bash
npm install
```

## Environment

Create a `.env` file in the project root:

```text
REQUESTY_API_KEY=your_requesty_api_key
```

The `.env` file is ignored by Git.

## Run

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

Employees can enter a free-text request and use AI Assist before creating the request.

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

The current bounded authorization rule permits IT actors in the IT department to perform the implemented status transition.

## Tests

```bash
npm test
npm run build
```

## AI Evaluations

Run the Week 4 AI evaluation set with:

```bash
npm run eval:ai
```

The evaluation set covers clear, thin, ambiguous, mixed-context, invalid-output, and provider-failure cases.

See `docs/week4-production-ai.md` for the Week 4 capability and evaluation evidence.