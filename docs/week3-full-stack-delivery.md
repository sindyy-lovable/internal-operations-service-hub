# Week 3 Full-Stack Delivery

This repository keeps the Week 2 service request lifecycle and adds a narrow Week 3 slice:

- `POST /requests` for creating a request
- `GET /requests/:requestId` for reading a request and a minimal history
- `PATCH /requests/:requestId/status` for one business transition

## API Contract

- `POST /requests` accepts a non-empty `description` and returns the created request.
- `GET /requests/:requestId` returns `id`, `description`, `status`, and `history`.
- `PATCH /requests/:requestId/status` accepts `status`, `actor`, and `department`, and returns the updated request.

The UI is intentionally small and focused on creating, viewing, and making one permitted status transition. It uses a simple authorization rule for one permitted department actor (`IT`) and one denied case (`HR`).

The backend is backed by SQLite persistence through TypeORM. The database stores service requests and request history records.


The explicit invalid request case is an empty description, which receives `400 Bad Request`. The explicit expected failure case is a missing request ID that receives `404 Not Found`. The authorization denied case receives `403 Forbidden`.

## Automated Verification

The Week 3 slice includes:

- One automated business-rule test for the authorization rule.
- One integration test between the NestJS backend and the SQLite database.
- One meaningful E2E test covering the Service Request flow.
- Regression protection through the existing Week 2 lifecycle tests.

The automated tests verify the allowed and denied authorization cases, the invalid request case, the expected failure case, database persistence, and the user-facing request flow.
