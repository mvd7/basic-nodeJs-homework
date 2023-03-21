import express from "express";
import session from "express-session";
import BlogsController from "../controllers/blog-controller.js";
import { blogSession } from "../sessions/blog.session.js";
import { authSession } from "../sessions/auth.session.js";
import { isLoggedInValidator } from "../middlewares/session.auth.validator.js";

const blogsController = new BlogsController();
const postsRouter = express.Router();

// LISTING ALL POSTS

postsRouter.get("/", async (req, res) => {
  const posts = await blogsController.listPosts();
  res.send(posts);
});

// CREATING NEW POST

postsRouter.post(
  "/post",
  authSession,
  isLoggedInValidator,
  blogSession,
  async (req, res) => {
    const body = req.body;

    if (!body.title || !body.body || !body.tags || !body.author) {
      res.status(400).send({ message: "Invalid body." });
      return;
    }
    await blogsController.createPost(
      body.title,
      body.body,
      body.author,
      body.tags
    );

    res.status(201).send({ message: "Post was created." });

    const session = req.session;
    console.log(session);
  }
);

// DELETING POST BY ID

postsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedPost = await blogsController.deletePost(id);

  if (deletedPost) {
    res.status(200).send({ message: "Post was deleted from database." });
  } else {
    res.status(404).send({ message: `Post with id "${id}" not found.` });
  }
});

// EDITING AN EXISTING BLOG POST

postsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, body, tags } = req.body;

  if (!title || !body || !tags) {
    res.status(400).send({ message: "Invalid body." });
    return;
  }

  const editedPost = await blogsController.editPost(id, title, body, tags);

  if (editedPost) {
    res.status(200).send({ message: `Post with ID "${id}" was updated.` });
  } else {
    res.status(404).send({ message: `Post with ID "${id}" not found.` });
  }
});

// http://localhost:3000/blog/posts?tags={YOUR TAGS}
// BONUS
postsRouter.get("/posts", async (req, res) => {
  const tags = req.query.tags;

  const byTags = await blogsController.getPostsByTags(tags);

  if (byTags.length != 0) {
    res.status(200).send(byTags);
  } else {
    res.status(404).send("There are you posts with this tags.");
  }
});

export default postsRouter;
