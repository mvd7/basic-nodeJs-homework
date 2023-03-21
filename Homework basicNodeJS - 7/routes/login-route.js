import express from "express";
import fileService from "../shared-services/file-service.js";
import { authSession } from "../sessions/auth.session.js";

const loginRouter = express.Router();

loginRouter.post("/login", authSession, async (req, res) => {
  const users = JSON.parse(
    await fileService.readFile("./db/users.json", { encoding: "utf-8" })
  );

  const username = req.body.username;
  const password = req.body.password;

  const loginUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (loginUser === undefined) {
    res.status(404).send({ message: "Wrong username or password." });
  } else {
    req.session.user = {
      user: username,
      isLoggedIn: true,
    };
    res.status(201).send({ message: "Logged in successfully." });
  }
});

loginRouter.post("/logout", authSession, (req, res) => {
  req.session.destroy();
  res.send({ message: "Logged out." });
});

export default loginRouter;
