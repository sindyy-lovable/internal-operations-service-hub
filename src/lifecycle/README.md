# Lifecycle Slice

The Week 2 lifecycle supports:

- `SUBMITTED -> IN_PROGRESS`
- `IN_PROGRESS -> COMPLETED`

The in-memory service records the initial submission and every successful status transition in request history. Invalid transitions fail before the request or its history is mutated.
