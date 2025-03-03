const express = require('express');
const router = express.Router();
const { 
  getAllTasks, 
  getTask, 
  createTask, 
  updateTask, 
  deleteTask 
} = require('../controllers/taskController');

router.route('/')
  .get(getAllTasks)
  .post(createTask);

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;