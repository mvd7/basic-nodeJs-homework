import express from "express";
import router from "./routes.js";
import fs from "fs";

const app = express();

// MIDDLEWARE

app.use((req, res, next) => {
  let time = new Date().toLocaleString();

  console.log(`Request on the route "${req.url}" was made at ${time}.`);

  fs.appendFileSync(
    "./logs.txt",
    `\nRequest on the route "${req.url}" was made at ${time}.`
  ); // BONUS

  next();
});

app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("Server is up...");
});
