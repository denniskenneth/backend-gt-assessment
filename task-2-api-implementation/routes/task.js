const express = require('express');
const {
    postTask,
    getTask,
    patchTask,
    patchTaskStatus,
    patchTaskUnassign,
    deleteTask
} = require('../controllers/task.controller')
const Router = express.Router();


Router.post('/', postTask);
Router.get('/', getTask);
Router.patch('/:id', patchTask);
Router.patch('/:id/status', patchTaskStatus);
Router.patch('/:id/unassign', patchTaskUnassign);
Router.delete('/:id', deleteTask);

module.exports = Router;