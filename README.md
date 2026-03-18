# Backend GT Assessment

## Structure

```
backend-gt-assessment/
├── README.md
├── EXPLANATION.md
├── task-1-api-reasoning.md
├── task-2-api-implementation/
└── task-3-system-thinking.md
```

---

## Task 2 — Setup & Running the API

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
cd task-2-api-implementation
npm install
```

### Environment

Create a `.env` file in `task-2-api-implementation/`:

```
PORT=3003
```

### Running the server

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:3003`

---

## API Endpoints

All endpoints require the `x-user-id` header to identify the current user.

### Create Task
```
POST /tasks
x-user-id: 1
Content-Type: application/json

{
  "title": "Complete assessment",
  "priority": "high",
  "assignedTo": 2,
  "assignedBy": 1
}
```

### Get All Tasks
```
GET /tasks
x-user-id: 1
```

Optional query filters:
```
GET /tasks?assignedTo=2
GET /tasks?status=pending
```

### Update Task (assigner only)
```
PATCH /tasks/1
x-user-id: 1
Content-Type: application/json

{
  "title": "Updated title",
  "priority": "medium"
}
```

### Update Task Status (assignee only)
```
PATCH /tasks/1/status
x-user-id: 2
Content-Type: application/json

{
  "status": "in-progress"
}
```

### Unassign Task (assigner only)
```
PATCH /tasks/1/unassign
x-user-id: 1
```

### Delete Task (assigner only)
```
DELETE /tasks/1
x-user-id: 1
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 201 | Task created |
| 200 | Success |
| 400 | Invalid input |
| 401 | Missing or invalid x-user-id header |
| 403 | User not authorised to perform this action |
| 404 | Task not found |
| 500 | Server error |
