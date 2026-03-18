require('dotenv').config();
const express = require('express');
const taskRouter = require('./routes/task');
const authMiddleware = require('./middlewares/auth.middleware')

const app = express();
app.use(express.json());

app.use('/tasks', authMiddleware, taskRouter);


module.exports = app;