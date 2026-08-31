# Internal Operations Service Hub - Data Model

**Student Name: SINDY TAUK**

## 1. Purpose

This data model defines the information the Internal Operations Service Hub needs to remember in order to support request submission, routing, handling, tracking, authorization, and request history.

The model is derived from `product-spec.md` and `architecture.md` and includes only data required by the current product scope.

## 2. Domain Model

The main data concepts are based on the information the system needs to keep while a request moves from submission to completion.

### User

Represents a person who uses the internal system. A user may submit requests or, when authorized, handle requests for a department.

The exact roles and permissions are not fully defined yet.

### Department

Represents an internal department that can receive and handle requests, such as HR or IT.

A department can be involved in many requests, and a request may involve more than one department when required.

### Service Request

Represents an internal request submitted by an employee.

Each request has one requester and keeps the information needed to understand the request, its category, its current status, and its progress.

### Request Category

Represents the category used to help identify what type of request was submitted and support routing to the appropriate department.

The exact categories are still undefined.

### Department Assignment

Represents the involvement of a department in handling a request.

A request may have one or more department assignments when a multi-department workflow is required. The exact department order and routing rules are not defined yet.

### Request History

Represents important changes that happen during the life of a request, such as status changes, handling updates, and department transfers.

Each history entry belongs to one request and should keep enough information to show what changed and when it happened.  

## 3. Relationships, Cardinality, and Ownership

The main relationships between the data concepts are:

- One User can submit many Service Requests, but each Service Request has one requester.
- One Service Request may belong to a Request Category. One Request Category can be used by many Service Requests.
- One Service Request can have zero or more Department Assignments during its lifecycle.
- One Department can have many Department Assignments.
- One Service Request can have many Request History entries.
- Each Request History entry belongs to one Service Request.
- A Request History entry may identify the User responsible for an important change when that information is available.

### Ownership

The Service Request is the main record for the request lifecycle.

Department Assignments belong to the Service Request because they describe which departments are involved in handling that request.

Request History entries also belong to the Service Request because they record important changes that happen during its lifecycle.

Users, Departments, and Request Categories exist independently and may be related to many requests.

## 4. Lifecycle and Rules

### Request Lifecycle

A Service Request starts when an authorized employee submits it successfully.

During its lifecycle, the request may be categorized, routed to a department, handled by authorized department members, and moved between departments when a multi-department workflow is required.

The current status is maintained on the Service Request, while important status changes, handling updates, and department transfers are recorded in Request History.

The request continues through its defined workflow until it reaches a completed state.

The exact status values and allowed transitions are not defined yet because they remain unknown in the product specification.

### Data Rules

- Every Service Request must have one requester.
- A submitted request must keep the information needed to understand the requested service or assistance.
- Important status changes and handling updates must be recorded in Request History.
- A failed status update must not replace the last confirmed status.
- A failed department transfer must not replace the last confirmed department assignment.
- Request history must remain linked to the request it describes.
- Multi-department requests must keep their previous history when moving between departments.

### Authorization Rules

- Only authorized users can access protected request information.
- Employees can view requests they are authorized to access.
- Department members can handle or update requests only when they have the required permission.
- Status changes and department transfers can only be performed by authorized users.
- Administrative actions are limited to users with the appropriate administrative permission.

## 5. Storage

### Storage Model

A relational storage model is suitable for the current system because the main data concepts have clear relationships.

Service Requests are connected to Users, Request Categories, Department Assignments, Departments, and Request History. A relational model helps keep these relationships consistent and supports the traceability required by the system.

The specific database technology is not selected at this stage because implementation details are outside the current scope.

### Durable Data

The following information should be stored durably:

- Service Requests and their current state.
- Users and the information needed to identify them in the system.
- Departments.
- Request Categories.
- Department Assignments related to requests.
- Important Request History entries.

This information should remain available because it is needed to handle requests, track their progress, and preserve important history.

### Derived Data

Information that can be calculated reliably from stored data does not need to be stored separately.

For example, the number of requests submitted by a user can be calculated from the stored Service Requests instead of being maintained as a separate value.

### Retention

Request data and important history should remain available while they are required for request tracking and traceability.

The exact retention period is not defined in the current product specification, so no specific retention duration is assumed.

## 6. Access Patterns and Indexes

### Access Patterns

The system needs to support the following common ways of accessing data:

- An employee views the requests they submitted.
- An employee views the current status and progress of a specific request.
- An authorized department member views requests assigned to their department.
- An authorized department member opens a request to handle or update it.
- The system retrieves the history of a request to show important changes and transfers.
- Routing and Workflow uses request category information to determine the appropriate department according to defined routing rules.

### Index Considerations

Indexes should only be added when they support a clear access pattern.

Possible indexes may include:

- Requester identifier on Service Requests, to find requests submitted by a specific employee.
- Department identifier on Department Assignments, to find requests assigned to a specific department.
- Request identifier on Request History, to retrieve the history of a specific request.

Exact indexes will depend on the final database design and expected usage, so additional indexes are not defined at this stage.
