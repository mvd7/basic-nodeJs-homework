import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import colors from "colors";

// SYNCRONOUS FS OPERATIONS
const writeToFile = (path, data) => {
  fs.writeFileSync(path, data);
};

const appendToFile = (path, data) => {
  fs.appendFileSync(path, data);
};

const readFromFile = (path) => {
  const content = fs.readFileSync(path, { encoding: "utf-8" });

  return content;
};

// TODOS LOGIC
export const readTodos = (path) => {
  // Pri chitanje na json fajlot ni frakja
  // stingificiran json
  const todos = readFromFile(path);

  //go parsirame stringificiraniot json
  const parsedTodos = JSON.parse(todos);

  return parsedTodos;
};

export const addTodo = (path, todoName, isTodoDone) => {
  const todo = {
    id: uuidv4(),
    name: todoName,
    done: isTodoDone,
  };

  const allTodos = readTodos(path);
  allTodos.push(todo);

  writeToFile(path, JSON.stringify(allTodos, null, 2));

  console.log(`Added Todo with id: ${uuidv4()}.`.bgGreen);
};

// DELETE TODO LOGIC

export const deleteTodo = (path, id) => {
  const allTodos = readTodos(path);

  const filteredTodos = allTodos.filter((todo) => todo.id !== id);

  writeToFile(path, JSON.stringify(filteredTodos, null, 2));

  console.log(`Deleted Todo with id ${id}.`.bgRed);
};

// GET TODO BY ID

export const getTodoById = (path, id) => {
  const allTodos = readTodos(path);

  const todo = allTodos.find((todo) => todo.id === id);

  console.log(todo);
};

// MARK TODO AS DONE

export const markTodoAsDone = (path, id) => {
  const allTodos = readTodos(path);

  const todo = allTodos.find((todo) => todo.id === id);

  if (todo) {
    if (todo.done === false) {
      todo.done = true;
      writeToFile(path, JSON.stringify(allTodos, null, 2));
      console.log(`Todo marked as done.`.bgGreen);
    } else {
      console.log(`Todo already done.`.bgBlue);
    }
  } else {
    console.log(`Todo not found.`.bgRed);
  }
};
