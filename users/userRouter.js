const express = require("express");

const router = express.Router();

const userDB = require("./userDb");
const postDB = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  const user = req.body;
  userDB
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "oh no" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const post = req.body
  postDB.insert(post)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({error: 'Error adding a post'})
  })

});

router.get("/", (req, res) => {
  userDB
    .get(req.query)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "uh oh" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  userDB
    .getById(id)
    .then((found) => {
      res.status(200).json(found);
    })
    .catch((error) => {
      res.status(404).json({ message: "could not find id of user" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const id = req.params.id;
  userDB
    .getUserPosts(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json("oh no");
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  userDB
    .remove(id)
    .then((bye) => {
      res.status(204).json({ message: "successfully deleted post" });
    })
    .catch((error) => {
      console.log("hers the error", error);
      res.status(500).json("oh no");
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  userDB
    .update(id, changes)
    .then((change) => {
      res.status(200).json({ message: "successfully updated the post" });
    })
    .catch((error) => {
      console.log("hers the error", error);
      res.status(500).json("oh no");
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  userDB
    .getById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "invalid user id" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error 500!!!" });
    });
}

function validateUser(req, res, next) {
  const user = req.body;
  if (!user.name) {
    res.status(400).json({ error: "missing user name" }).end();
  }
  if (typeof name !== "string") {
    res.status(400).json({ error: "Name must be a string" });
  }
  req.body = { name };
  next();
}

function validatePost(req, res, next) {
  const { id: user_id } = req.params;
  const { text } = req.body; // same as req.body.text
  if (!text) {
    res.status(400).json({ message: "missing user text" });
  }
  if (!req.body) {
    res.status(400).json({ message: "missing user body data" });
  }
  req.body = {user_id, text}
  next()
}

module.exports = router;
