// External Module
const express = require("express");
const toItemRouter = express.Router();

// Local Module
const toItemController = require("../controllers/todoItemController");

toItemRouter.post("/", toItemController.createTodoItem);

module.exports = toItemRouter;
