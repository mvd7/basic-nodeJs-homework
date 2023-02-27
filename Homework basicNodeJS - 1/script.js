const colors = require("colors");

let users = [
  {
    role: "admin",
    fullname: "John Doe",
    username: "john.doe",
    password: "john1234",
  },
  {
    role: "client",
    fullName: "Bob Bobski",
    username: "bobski.bob",
    password: "bob1234",
  },
  {
    role: "client",
    fullName: "Tom Tomsky",
    username: "tom.tomsky",
    password: "tom1234",
  },
  {
    role: "client",
    fullName: "Mike Tyson",
    username: "mike.tyson",
    password: "mike1234",
  },
];

// without high order functions

// const login = (username, password) => {
//   for (const user of users) {
//     if (user.username === username && user.password === password)
//       return `${user.username} is logged in.`.green;
//   }
//   return `User not found.`.red.bgYellow;
// };

// with high order functions.

const login = (username, password) => {
  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );
  return foundUser
    ? `${foundUser.username} is logged in.`.green
    : `User not found.`.red.bgYellow;
};

console.log(login(`mike.tyson`, `mike1234`));
console.log(login(`vasko.zabata`, `vasko1234`));
console.log(login(`bobski.bob`, `bob1234`));
