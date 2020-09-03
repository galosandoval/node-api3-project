const express = require("express");

const router = express.Router();

const userDB = require("./userDb");

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  userDB
    .getById(id)
    .then((post) => {
      if (post) {
        req.user = post;
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
  if (!user.name || !user) {
    res.status(400).json({ message: "missing user data" }).end();
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const user = req.body
  if(!user.text || !user) {
    res.status(400).json({ message: "missing user data" }).end();
  } else {
    next();
  }
}

module.exports = router;
