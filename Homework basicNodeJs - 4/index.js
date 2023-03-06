import http from "http";

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Hello this is default landing page.</h1>");
    res.end();
  }
  if (url === "/student") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h2>Student name: Aleksandar</h2>");
    res.write("<h2>Student last name: Dimov</h2>");
    res.write("<h3>Academy: SEDC</h3>");
    res.write("<h3>Subject: Basic nodeJs</h3>");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is up!");
});
