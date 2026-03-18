const taskService = require('../services/task.service');


const postTask = (req, res) => {
    try {
        const data = req.body;

        const result = taskService.createTask(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};
const getTask = (req, res) => {
    try {

        const result = taskService.getAllTasks(req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};
const patchTask = (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = taskService.updateTask(id, req.body, req.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};
const patchTaskStatus = (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = taskService.updateTaskStatus(id, req.body.status, req.userId);
        res.status(200).json(result);

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};
const patchTaskUnassign = (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = taskService.unassignTask(id, req.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};
const deleteTask = (req, res) => {
    try {

        const id = Number(req.params.id);
        taskService.deleteTask(id, req.userId);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    postTask,
    getTask,
    patchTask,
    patchTaskStatus,
    patchTaskUnassign,
    deleteTask
}