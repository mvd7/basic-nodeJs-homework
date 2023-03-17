import { v4 as uuidV4 } from "uuid";

export class Post {
  constructor(title, body, author, tags) {
    this.id = uuidV4();
    this.title = title;
    this.body = body;
    this.author = author;
    this.time = new Date().toLocaleString();
    this.tags = tags;
  }
}
