const fs = require(`fs`);
const path = require(`path`);

fs.writeFileSync(`homework.txt`, `Homework 02 in Basic Node`);

fs.appendFileSync("homework.txt", "\nFINISHED!");

let homeworkPath = path.join(__dirname, `homework.txt`);

// console.log(homeworkPath); * checking if its right location.

let content = fs.readFileSync(homeworkPath, { encoding: "utf-8" });

console.log(content);
