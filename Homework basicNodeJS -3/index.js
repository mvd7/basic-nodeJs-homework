import { addStudent, readStudents } from "./students-logic.js";

readStudents("./students.json");

const jsonPATH = "./students.json";

addStudent(
  jsonPATH,
  "Steven I. Perez",
  "StevenIPerez@armyspy.com",
  "1234567890***"
);

addStudent(jsonPATH, "Mina H. Weaver", "MinaHWeaver@armyspy.com", "818^!#2");

addStudent(jsonPATH, "Aleksandar Dimov", "dimov0703@gmail.com", "123123123");

addStudent(jsonPATH, "John Doe", "mail@mail.com", "password123");
