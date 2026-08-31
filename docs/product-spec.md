# Internal Operations Service Hub
**Student Name:SINDY TAUK**

## What Does Done Mean?

### 1. What problem are you solving?

The company needs a clear and centralized way to manage internal service requests across departments. The Internal Operations Service Hub should make it easier to submit requests, direct them to the appropriate department, handle them, and track their progress until completion.

### 2. Who is involved?

The main stakeholders are employees who submit requests and the internal departments responsible for handling them, including HR and IT. A system administrator may also be required to manage user access and basic system configuration.

### 3. What must the product do?

The product must allow employees to submit internal service requests, route requests to the appropriate department, allow authorized department members to review and handle them, update request status, and allow requesters to track progress. The system should also be capable of supporting workflows involving more than one department when required.

### 4. What is definitely known?

- The product is an internal company service hub.
- Employees need a way to submit internal service requests.
- Internal departments are responsible for handling requests.
- Employees need to be able to follow the progress of their requests.
- HR and IT are among the departments involved.
- Request routing and coordination between departments must be considered.

### 5. What is still unknown?

The exact request categories, statuses, approval rules, access permissions, and routing rules have not yet been defined. It is also unknown whether certain requests must pass through departments in a specific order, whether requests can be sent directly to a department, and how multi-department workflows should operate.

### 6. What assumptions did you make?

- Employees will have an identity or account that allows them to access the internal system.
- Requests can be categorized to help determine the appropriate department.
- HR and IT members will be authorized to handle requests related to their responsibilities.
- Some request types may require involvement from more than one department.
- A system administrator role may be required to manage access and basic system configuration.

### 7. What are you deliberately not solving?

The current scope does not include external customer requests, complete HR or IT management functionality, AI-based request handling or decision-making, or undefined department-specific business processes. Technical architecture, database design, and API design are also outside the scope of this specification.

### 8. What are a few examples of correct behavior?

- An employee submits a valid internal request and receives confirmation that it was submitted.
- A request is routed to the appropriate department according to the applicable routing rules.
- An authorized HR or IT member can view and handle a request assigned to their department.
- An employee can view the current status and progress of a request they submitted.
- When a request requires multiple departments, the request can progress through the required workflow without losing its history.

---

## Specification Draft

### 1. Problem / Context

The company needs a centralized system for managing internal service requests across departments such as HR and IT. Without a single service hub, requests can be difficult to organize, route, handle, and track consistently.

The Internal Operations Service Hub will provide one place where employees can submit requests, responsible departments can review and handle them, and requesters can follow their progress until completion. The system must also account for situations in which routing or coordination between departments is required.

### 2. Known Facts

- The system is intended for internal company operations.
- The company wants one centralized system for internal service requests.
- Employees need to be able to submit requests.
- Internal departments need to be able to handle requests.
- Requesters need to be able to follow the progress of their requests.
- HR and IT are among the departments involved.
- Routing and coordination between departments are relevant to the request-handling process.

### 3. Actors / Stakeholders

- Employee / Requester: Submits internal service requests and follows their status and progress.
- HR Department: Reviews and handles requests that fall within HR responsibilities and participates in workflows requiring HR involvement.
- IT Department: Reviews and handles requests that fall within IT responsibilities and participates in workflows requiring IT involvement.
- Operations Management: Has an interest in ensuring that internal service requests are handled efficiently and consistently.
- System Administrator (assumed): Manages user access and basic system configuration.

### 4. Functional Requirements

- FR-1: The system must allow employees to submit internal service requests.
- FR-2: A request must contain sufficient information for the responsible department to understand what service or assistance is required.
- FR-3: The system must support categorizing requests.
- FR-4: The system must support routing requests to the appropriate department according to defined routing rules.
- FR-5: Authorized department members must be able to view requests assigned to their department.
- FR-6: Authorized department members must be able to handle and update requests assigned to their department.
- FR-7: The system must support updating the status of a request as it progresses.
- FR-8: Employees must be able to view the current status and progress of requests they submitted.
- FR-9: The system must support workflows involving more than one department when required.
- FR-10: The system must maintain a history of important request updates and status changes until completion.

### 5. Non-Functional Requirements

- NFR-1 — Security: The system should be accessible only to authorized users.
- NFR-2 — Access Control: Users should only be able to view or modify request information they are authorized to access.
- NFR-3 — Usability: The system should be easy to understand and require minimal training for employees and department members.
- NFR-4 — Performance: Common actions, such as submitting a request or viewing its status, should complete within a reasonable response time.
- NFR-5 — Reliability: Submitted requests and recorded updates should not be lost during normal system operation.
- NFR-6 — Traceability: Important request status changes and handling actions should remain available for tracking.

### 6. Assumptions / Constraints / Unknowns

#### Assumptions

- Employees will have an identity or account that allows them to access the internal system.
- Requests can be categorized to help determine the appropriate department.
- HR and IT members will have permission to handle requests related to their responsibilities.
- Some request types may require involvement from more than one department.
- A system administrator role may be required to manage user access and basic system configuration.

#### Constraints

- The system is intended for internal company use.
- The initial scope is limited to submitting, routing, handling, and following internal service requests.
- This phase is limited to defining the product specification; implementation is not included.
- Technical architecture, database design, and API design are not part of this phase.
- AI features are not part of the current scope.

#### Unknowns

- What request types and categories must the system support?
- What information is required when submitting each type of request?
- What statuses must a request support?
- How is the appropriate department determined for each request?
- Can a request be sent directly to a department, or must certain requests follow a specific department order?
- If multiple departments are involved, what determines the order of handling?
- Are approvals required for certain request types?
- Who is authorized to change a request's status?
- What access permissions should each role have?
- Can requests be reassigned or returned to a previous department?
- Are notifications required when a request is submitted, updated, transferred, or completed?

### 7. Non-Goals

- The system will not manage external or customer-facing service requests.
- The system will not replace complete HR or IT management systems.
- The system will not define department-specific business processes that have not yet been provided.
- AI-based request handling, classification, or decision-making is not part of the current scope.
- Frontend and backend implementation are not part of this specification phase.
- Database schema design is not part of this specification phase.
- API design is not part of this specification phase.
- Architecture diagrams are not part of this specification phase.

### 8. Acceptance Criteria

- AC-1: Given an authorized employee provides the required request information, when the request is submitted, then the system records the request and confirms successful submission.
- AC-2: Given a submitted request has a defined type or category, when routing rules are applied, then the request is made available to the appropriate department.
- AC-3: Given a request is assigned to HR or IT, an authorized member of that department can view and handle the request.
- AC-4: Given an authorized department member updates a request's status, the new status is saved and visible to the requester.
- AC-5: An employee can view the current status and progress of requests they submitted.
- AC-6: When a defined workflow requires more than one department, the system supports the request progressing between the required departments according to that workflow.
- AC-7: Important status changes and handling updates are recorded and remain available as part of the request history.
- AC-8: A user without the required permission cannot view or modify restricted request information.
- AC-9: A request can be tracked from initial submission until it reaches a completed state.