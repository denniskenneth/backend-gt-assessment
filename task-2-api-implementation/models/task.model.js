const Status = Object.freeze({
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed'
});

const Priority = Object.freeze({
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
});

class Task {
    constructor(id, title, priority, assignedTo, assignedBy) {
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.status = Status.PENDING;
        this.assignedTo = assignedTo;
        this.assignedBy = assignedBy;
        this.createdAt = new Date().toISOString();
    }
}



module.exports = { Task, Status, Priority };