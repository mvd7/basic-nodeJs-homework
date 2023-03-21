import expressSession from "express-session";

export const blogSession = expressSession({
  secret: "secret_123",
  name: "blog_session",
  cookie: {
    maxAge: 5 * 60 * 60 * 1000,
  },
  saveUninitialized: true,
  resave: true,
});
