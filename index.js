const express = require("express");
const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");
const app = express();
// app.get("/", (req, res) => {
//   res.send("I am working");
// });
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.listen(7500, () => {
  console.log("Listening on port 7500!");
});
