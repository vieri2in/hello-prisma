const postsRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { user, post } = new PrismaClient();
postsRouter.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  //   console.log(user_id);
  const posts = await post.findMany({
    where: {
      user_id: parseInt(user_id),
    },
    select: {
      title: true,
      created_at: true,
      post: true,
      user: true,
    },
  });
  //   console.log(posts);
  res.json(posts);
});
postsRouter.post("/", async (req, res) => {
  const { title, content, user_id } = req.body;
  const foundUser = await user.findUnique({
    where: {
      id: user_id,
    },
  });
  if (!foundUser) {
    return res.status(400).json({
      error: "User not found",
    });
  }
  const newPost = await post.create({
    data: {
      title,
      post: content,
      user_id,
    },
  });
  res.json(newPost);
});
module.exports = postsRouter;
