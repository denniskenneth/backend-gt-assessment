const store = require('../models/task.store');
const { Task } = require('../models/task.model');

class TaskRepository {
    constructor() {
        this.store = store;
    }

    findAllTask = (filters = {}) => {
        let result = this.store.tasks;
        if (filters.assignedTo) return result.filter(task => task.assignedTo === filters.assignedTo);
        if (filters.status) return result.filter(task => task.status === filters.status);

        return result;
    }

    findTaskById = (id) => {
        const task = this.store.tasks.find(task => task.id === id);

        return task;
    }

    saveTask = (data) => {
        const task = new Task(
            this.store.nextId,
            data.title,
            data.priority,
            data.assignedTo,
            data.assignedBy
        );
        this.store.tasks.push(task);
        this.store.nextId++;
        return task;
    }

    updateTask = (id, updates) => {
        const task = this.findTaskById(id);
        if (!task) return null;
        const obj = Object.assign(task, updates);

        return obj;
    }

    deleteTask = (id) => {
        const index = this.store.tasks.findIndex(task => task.id === id);
        if (index === -1) return false;
        this.store.tasks.splice(index, 1)
        return true;
    }
}

module.exports = new TaskRepository();