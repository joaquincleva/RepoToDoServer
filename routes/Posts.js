const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({  });
  res.json({ listOfPosts: listOfPosts });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
  });
  res.json(listOfPosts);
});

router.get("/idpriocomptag/:id/:priority/:completed/:tag", async (req, res) => {
  const id = req.params.id;
  const priority = req.params.priority;
  const tag = req.params.tag;
  const completed = req.params.completed;
  const listOfPosts = await Posts.findAll({
    where: { priority: priority,  UserId: id, tag: tag, completed: completed },
    });
  res.json(listOfPosts);
})

router.get("/idtag/:id/:tag", async (req, res) => {
  const id = req.params.id;
  const tag = req.params.tag;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id, tag: tag },
    });
  res.json(listOfPosts);
})

router.get("/idprio/:id/:priority", async (req, res) => {
  const id = req.params.id;
  const priority = req.params.priority;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id, priority: priority },
    });
  res.json(listOfPosts);
})

router.get("/idcom/:id/:completed", async (req, res) => {
  const id = req.params.id;
  const completed = req.params.completed;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id, completed: completed },
    });
  res.json(listOfPosts);
})

router.get("/idpriotag/:id/:priority/:tag", async (req, res) => {
  const id = req.params.id;
  const priority = req.params.priority;
  const tag = req.params.tag;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id, priority: priority, tag: tag }
  });
  res.json(listOfPosts);
})

router.get("/idpriocom/:id/:priority/:completed", async (req, res) => {
  const id = req.params.id;
  const priority = req.params.priority;
  const completed = req.params.completed;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id, priority: priority, completed: completed },
    });
  res.json(listOfPosts);
})

router.get("/idtagcom/:id/:tag/:completed", async (req, res) => {
  const id = req.params.id;
  const tag = req.params.tag;
  const completed = req.params.completed;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id, tag: tag, completed: completed },
    });
  res.json(listOfPosts);
})



router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

router.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  res.json(newTitle);
});

router.put("/completed", validateToken, async (req, res) => {
  const { completado, id } = req.body;
  await Posts.update({ completed: completado }, { where: { id: id } });
  res.json(completado);
});

router.put("/postText", validateToken, async (req, res) => {
  const { newText, id } = req.body;
  await Posts.update({ postText: newText }, { where: { id: id } });
  res.json(newText);
});

router.put("/postTag", validateToken, async (req, res) => {
  const { newPostTag, id } = req.body;
  await Posts.update({ tag: newPostTag }, { where: { id: id } });
  res.json(newPostTag);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
