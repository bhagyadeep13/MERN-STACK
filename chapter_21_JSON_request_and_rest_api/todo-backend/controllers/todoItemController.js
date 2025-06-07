const TodoItem = require('../models/todoItem');

exports.createTodoItem = async (req, res) => {
  const {task, date} = req.body;
  const todoItem = new TodoItem({
    task: task,
    date: date
  });
  await todoItem.save();
  res.status(201).json({
    todoItem: todoItem
  });
}