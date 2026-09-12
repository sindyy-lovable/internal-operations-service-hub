# Internal Operations Service Hub

This repository contains the approved Week 3 bounded full-stack service-request slice on top of the existing Week 2 lifecycle regression behavior.

## Install

```bash
npm install
```

## Run

```bash
npm run start:dev
```

## User Flow

1. Submit a valid request with `POST /requests` and a non-empty `description` string.
2. Read the created request with `GET /requests/:requestId`.
3. Transition the request from `SUBMITTED` to `IN_PROGRESS` using `PATCH /requests/:requestId/status` with `actor: "IT"` and `department: "IT"`.
4. A non-permitted actor such as `HR` receives `403 Forbidden` for the same transition.

## Tests

```bash
npm test
npm run build
```

The repository preserves the existing Week 2 regression lifecycle tests and adds the minimal Week 3 business-rule, database integration, and E2E tests required by the assignment.

