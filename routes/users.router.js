const usersRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { user, post } = new PrismaClient();
usersRouter.get("/", async (req, res) => {
  const users = await user.findMany({
    select: {
      username: true,
      posts: true,
    },
  });
  res.json(users);
});
usersRouter.post("/", async (req, res) => {
  const { username } = req.body;
  const foundUser = await user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
    },
  });
  if (foundUser) {
    return res.status(400).json({
      error: "User already exist",
    });
  }
  const newUser = await user.create({
    data: {
      username,
    },
    select: {
      username: true,
    },
  });
  res.json(newUser);
  //   res.json(foundUser);
});
module.exports = usersRouter;
