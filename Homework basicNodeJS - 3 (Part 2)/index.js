import {
  addTodo,
  readTodos,
  deleteTodo,
  markTodoAsDone,
  getTodoById,
} from "./todos-logic.js";

readTodos("./todos.json");

const todosJSON = "./todos.json";

// addTodo(todosJSON, "Study node js", false);

// addTodo(todosJSON, "Go to the gym", false);

// addTodo(todosJSON, "Clean the room", true);

// markTodoAsDone(todosJSON, "bda0a5e9-0439-4e73-bfa2-e30b9dab60b4");
markTodoAsDone(todosJSON, "0a84941b-16a9-46e0-ae12-3cf2c477a3f0");
markTodoAsDone(todosJSON, "asdadsa");

// getTodoById(todosJSON, "bda0a5e9-0439-4e73-bfa2-e30b9dab60b4");
