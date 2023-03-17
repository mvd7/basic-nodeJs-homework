import fileService from "../shared-services/file-service.js";
import { Post } from "../entities/blog-entity.js";

class BlogPost {
  async getAllPosts() {
    const rawPosts = await fileService.readFile("./db/blogs.json");
    const posts = JSON.parse(rawPosts);

    return posts;
  }

  async createPost(title, body, author, tags) {
    const rawPosts = await fileService.readFile("./db/blogs.json");
    const posts = JSON.parse(rawPosts);

    const post = new Post(title, body, author, tags);

    posts.push(post);
    await fileService.writeFile(
      "./db/blogs.json",
      JSON.stringify(posts, null, 2)
    );
  }

  async deletePost(id) {
    const rawPosts = await fileService.readFile("./db/blogs.json");
    const posts = JSON.parse(rawPosts);

    const filteredPosts = posts.filter((post) => post.id !== id);

    if (filteredPosts.length !== posts.length) {
      await fileService.writeFile(
        "./db/blogs.json",
        JSON.stringify(filteredPosts, null, 2)
      );

      return true;
    } else {
      return false;
    }
  }

  async editPost(id, title, body, tags) {
    const rawPosts = await fileService.readFile("./db/blogs.json");
    const posts = JSON.parse(rawPosts);

    const index = posts.findIndex((post) => post.id === id);

    if (index !== -1) {
      posts[index].title = title;
      posts[index].body = body;
      posts[index].tags = tags;

      await fileService.writeFile(
        "./db/blogs.json",
        JSON.stringify(posts, null, 2)
      );

      return true;
    } else {
      return false;
    }
  }
  async getPostsByTags(tags) {
    const rawPosts = await fileService.readFile("./db/blogs.json");
    const posts = JSON.parse(rawPosts);

    const filteredPosts = posts.filter((post) => {
      const postTags = post.tags.map((tag) => tag.toLowerCase());
      const searchTags = tags.split(",").map((tag) => tag.trim().toLowerCase());
      return searchTags.every((tag) => postTags.includes(tag));
    });

    return filteredPosts;
  }
}

export default BlogPost;
