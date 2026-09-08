# Internal Operations Service Hub

This repository contains the specification, architecture, data model, and architecture decision record for the Internal Operations Service Hub.

The project defines a centralized internal system where employees can submit service requests, departments such as HR and IT can handle them, and requesters can track their progress until completion.

## Project Documents

- [product-spec.md](docs/product-spec.md) - Defines the problem, stakeholders, requirements, assumptions, constraints, unknowns, non-goals, and acceptance criteria.
- [architecture.md](docs/architecture.md) - Describes the main system components, responsibilities, flows, boundaries, reliability considerations, and architecture decisions.
- [data-model.md](docs/data-model.md) - Defines the main data concepts, relationships, lifecycle rules, storage choices, and access patterns.
- [ADR-001.md](decisions/ADR-001.md) - Records the decision to maintain Request History together with the current request state.

## Week 2 Implementation

Week 2 adds a small NestJS Service Request lifecycle slice using in-memory data. The implemented lifecycle is:

- `SUBMITTED -> IN_PROGRESS`
- `IN_PROGRESS -> COMPLETED`

The API provides these endpoints:

- `POST /requests` - Creates a request in `SUBMITTED` status.
- `GET /requests/:requestId` - Retrieves the request and its history.
- `PATCH /requests/:requestId/status` - Applies a valid status transition.

Frontend, a real database, authentication, and authorization are not required for this milestone.

### Run

```bash
npm install
npm run start:dev
```

### Verify

```bash
npm test
npm run build
```


## Current Scope

The current project includes the Week 1 product requirements, system architecture, and data model, plus the Week 2 NestJS lifecycle implementation.

Frontend implementation, a real database, authentication, AI features, and detailed database schema design are outside the current scope.

