import express from "express";
import blogsRouter from "./routes/blog-routes.js";
const app = express();

app.use(express.json());

app.use("/blog", blogsRouter);

app.listen(3000, () => {
  console.log("Server is up...");
});
