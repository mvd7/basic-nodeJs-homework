import fs from "fs";
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();
import path from "path";
import { v4 as uuidv4 } from "uuid";
import colors from "colors";

// ***********************^^^ REQUIRED IMPORTS ^^^************************

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

export const readStudents = (path) => {
  const students = readFromFile(path);

  const parsedStudents = JSON.parse(students);

  return parsedStudents;
};

export const addStudent = (
  path,
  studentFullName,
  studentEmail,
  studentPassword
) => {
  const student = {
    id: uuidv4(),
    fullName: studentFullName,
    email: studentEmail,
    password: studentPassword,
  };

  const allStudents = readStudents(path);
  allStudents.push(student);

  writeToFile(path, JSON.stringify(allStudents, null, 2));

  eventEmitter.on("student", () =>
    console.log(`Welcome ${studentFullName}.`.bgGreen)
  );

  eventEmitter.emit("student");

  appendToFile("./greeting_log.txt", `\nWelcome ${studentFullName}.`);
};
