# Explanation

## How I approached the implementation

I started by reading the requirements carefully before writing any code. The main things I identified upfront were the 6 endpoints, the business rules around who can do what, and the fact that the userId comes from a header rather than a real auth system.

From there I built the project layer by layer — model first, then store, then repository, then service, then controller, then routes. I avoided wiring things together until each layer was solid on its own. This made it easier to catch bugs early rather than debugging the whole stack at once.

## Why I structured the code the way I did

I used a layered architecture:

- **Model** — defines the shape of a task
- **Store** — holds the in-memory data (single source of truth)
- **Repository** — handles all reads and writes to the store
- **Service** — enforces business rules and authorization logic
- **Controller** — handles HTTP in/out only, delegates everything to the service
- **Middleware** — extracts and validates the userId from the header before any route runs

The reason for this separation is that each layer has one clear responsibility. The controller doesn't know what makes a valid priority value. The repository doesn't know who is allowed to delete a task. If any layer needs to change, the others are mostly unaffected.

I also moved Task construction into the repository rather than the service, to keep the service from having to know about the store's internal state (like `nextId`).

## Assumptions I made

- The `x-user-id` header is the only way to identify the current user — there is no real authentication system.
- `assignedBy` is sent in the request body on task creation rather than being derived from the current user's id. The requirements show it as part of the request payload, so I treated it that way.
- A user can assign a task to themselves (assignedTo and assignedBy can be the same user).
- Unassigning a task sets `assignedTo` to null but leaves the task intact.
- Filtering supports `assignedTo` and `status` independently but not combined — the repository applies whichever filter it finds first.
- In-memory storage is acceptable and data persistence across server restarts is not required.

## What I would improve given more time

- **Persistent storage** — swap the in-memory store for a real database (PostgreSQL would be my first choice) with proper indexing on the filter fields.
- **Combined filtering** — the current `findAllTask` applies either `assignedTo` or `status`, not both at the same time. I would fix this to support both filters simultaneously.
- **Pagination** — `GET /tasks` returns everything. With a real dataset this needs `limit` and `offset` params.
- **Better validation error messages** — currently a failed validation returns a generic "Invalid user input" message. It would be more useful to tell the caller exactly which field failed and why.
- **Tests** — I would write integration tests covering the happy paths and the authorization rules for each endpoint.
- **Rate limiting** — add a per-IP request limit to protect against abuse.

## Tools and AI assistance used

I used Claude (Claude Code) as a coding companion throughout this task. It helped me think through the layer structure, caught bugs as I wrote each file (wrong operator usage, incorrect argument types, missing exports), and reviewed each file before I moved to the next. The implementation and the decisions were mine — Claude acted as a reviewer that gave immediate feedback rather than waiting for a code review later.
