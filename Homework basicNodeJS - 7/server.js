import express from "express";
import blogsRouter from "./routes/blog-routes.js";
import loginRouter from "./routes/login-route.js";

const app = express();

app.use(express.json());

app.use("/blog", blogsRouter);

app.use(loginRouter);

app.listen(3000, () => {
  console.log("Server is up...");
});
