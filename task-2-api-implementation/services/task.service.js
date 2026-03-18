const { Task, Priority, Status } = require('../models/task.model');
const taskRepository = require('../repositories/task.repository');

class TaskService {
    _priorityValidation(priority) {
        if ([Priority.LOW, Priority.MEDIUM, Priority.HIGH].includes(priority)) return true;
        return false;
    }

    _statusValidation(status) {
        if ([Status.PENDING, Status.IN_PROGRESS, Status.COMPLETED].includes(status)) return true;
        return false;
    }
    _dataValidation(title, priority, assignedTo, assignedBy) {
        if (typeof title === 'string' && title.trim() !== '') {
            if (this._priorityValidation(priority)) {
                if (typeof assignedTo === 'number' && Number.isFinite(assignedTo) && !Number.isNaN(assignedTo)) {
                    if (typeof assignedBy === 'number' && Number.isFinite(assignedBy) && !Number.isNaN(assignedBy)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
    _existanceValidator(task) {
        if (!task) {
            const err = new Error('Resource does not exist');
            err.status = 404;
            throw err;
        }
    }
    _validate403(condition) {
        if (condition) {
            const err = new Error('Forbidden -  user does not have access');
            err.status = 403;
            throw err;
        }
    }



    createTask(data) {
        const valid = this._dataValidation(data.title, data.priority, data.assignedTo, data.assignedBy);
        if (!valid) {
            const err = new Error('Invalid user input');
            err.status = 400;
            throw err;
        }

        return taskRepository.saveTask(data);

    }
    getAllTasks(filters) {
        const mainFilters = {}
        if (filters.assignedTo) mainFilters.assignedTo = Number(filters.assignedTo);
        if (filters.status) mainFilters.status = filters.status;
        return taskRepository.findAllTask(mainFilters);
    }
    updateTask(id, updates, userId) {
        const task = taskRepository.findTaskById(id);
        this._existanceValidator(task);
        this._validate403(task.assignedBy !== userId);

        const allowedUpdates = {};
        if (updates.title !== undefined && typeof updates.title === 'string' && updates.title.trim() !== '') allowedUpdates.title = updates.title;
        if (updates.priority !== undefined && this._priorityValidation(updates.priority)) allowedUpdates.priority = updates.priority;


        return taskRepository.updateTask(id, allowedUpdates);
    }
    updateTaskStatus(id, status, userId) {
        const task = taskRepository.findTaskById(id);
        this._existanceValidator(task);
        if (!this._statusValidation(status)) {
            const err = new Error('Invalid status');
            err.status = 400;
            throw err;
        }

        this._validate403(task.assignedTo !== userId);

        return taskRepository.updateTask(id, { status });

    }
    unassignTask(id, userId) {
        const task = taskRepository.findTaskById(id);
        this._existanceValidator(task);
        this._validate403(task.assignedBy !== userId);

        return taskRepository.updateTask(id, { assignedTo: null })


    }
    deleteTask(id, userId) {
        const task = taskRepository.findTaskById(id);
        this._existanceValidator(task);
        this._validate403(task.assignedBy !== userId);

        return taskRepository.deleteTask(id);
    }
}

module.exports = new TaskService();