const express = require("express");
const {
  getAllTodos,
  createTodo,
  removeTodo,
  updateTodo,
  deletAllTodo,
} = require("../Controller/todocontroller"); //auto import
const router = express.Router();

//GET http://localhost:5000/todos
router.get("/todos", getAllTodos); //getAllTodos is from to-doController.js
router.post("/todos", createTodo); //createtodo is from to-doController.js
//post is use for sending the data to db
router.delete("/todos/deleteAll", deletAllTodo);
router.delete("/todos/:id", removeTodo);
router.put("/todos/:id", updateTodo);

module.exports = router; //module.exports is use for exporting the particular variable
