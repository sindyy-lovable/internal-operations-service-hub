# Week 2 Agentic Workflow

## Understand

The Week 2 implementation was based on these Week 1 sources:

- [Product specification](product-spec.md): requires request submission, status updates, progress tracking, completion, reliability, and traceability; it intentionally leaves exact statuses and transitions undefined.
- [Architecture](architecture.md): separates request management from workflow and request history, and requires the last confirmed state to remain valid after a failed update.
- [Data model](data-model.md): keeps current status on the Service Request and records important status changes in Request History.
- [ADR-001](../decisions/ADR-001.md): decides to maintain current request state together with a separate Request History.

For this bounded Week 2 slice, the lifecycle is:

- `SUBMITTED -> IN_PROGRESS`
- `IN_PROGRESS -> COMPLETED`

`SUBMITTED -> COMPLETED` and `COMPLETED -> IN_PROGRESS` are invalid. The invariant is that a failed transition does not change the last confirmed status or append a history entry. Every successful status change is recorded in Request History.

## Direct

The AI agent was directed to implement a small NestJS backend slice using in-memory data only. The scope excluded frontend, database, authentication, and authorization. The implementation was organized under `src/lifecycle/` with:

- a transition policy containing the allowed lifecycle graph;
- an in-memory service for request creation, status transitions, and history;
- REST endpoints for creating, reading, and transitioning requests;
- focused tests for valid transitions, invalid transitions, history recording, and failed-transition immutability.

The Week 1 documentation and the existing implementation were to remain unchanged while this document was added.

## Prove

Evidence from the Week 2 implementation:

- The transition policy tests accept `SUBMITTED -> IN_PROGRESS` and `IN_PROGRESS -> COMPLETED`.
- The transition policy tests reject `SUBMITTED -> COMPLETED` and `COMPLETED -> IN_PROGRESS`.
- The service tests confirm that successful transitions are recorded in request history.
- The service tests confirm that a failed transition leaves the status and history unchanged.
- `npm test -- --runInBand` passed: 2 test suites and 7 tests.
- `npm run build` completed successfully.
