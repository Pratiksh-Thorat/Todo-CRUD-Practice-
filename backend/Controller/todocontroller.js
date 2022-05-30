//controller is simple function
//json is also simple function in which we are just sending the js key : value pair
const todo = require("../Module/todomodule");

exports.getAllTodos = async (req, res) => {
  const result = await todo.find(); //find()
  res.json({
    success: true,
    message: "all todos",
    result: result, //use ??
  });
};

exports.createTodo = async (req, res) => {
  console.log(req.body);

  const result = await todo.create(req.body); //req.body use ?????
  res.json({
    success: true,
    message: "todo created",
    result: result, // use ???
  });
};

exports.removeTodo = async (req, res) => {
  console.log(req.params.id);

  const result = await todo.findByIdAndDelete(req.params.id); ///deletemany
  res.json({
    success: true,
    message: "todo deleted",
  });
};

exports.updateTodo = async (req, res) => {
  console.log(req.params.id);

  const result = await todo.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    success: true,
    message: "todo updated",
  });
};

exports.deletAllTodo = async (req, res) => {
  //console.log(req.params.id);

  const result = await todo.deleteMany();
  res.json({
    success: true,
    message: "todo is empty",
  });
};
