import BlogPost from "../models/blog-model.js";

const blogPost = new BlogPost();

class BlogsController {
  async listPosts() {
    const listenPosts = await blogPost.getAllPosts();

    return listenPosts;
  }
  async createPost(title, body, author, tags) {
    await blogPost.createPost(title, body, author, tags);
  }
  async deletePost(id) {
    const deletingPost = await blogPost.deletePost(id);
    return deletingPost;
  }

  async editPost(id, title, body, tags) {
    const editedPost = await blogPost.editPost(id, title, body, tags);

    return editedPost;
  }
  async getPostsByTags(tags) {
    const postByTag = await blogPost.getPostsByTags(tags);
    return postByTag;
  }
}

export default BlogsController;
