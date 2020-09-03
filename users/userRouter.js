const express = require("express");

const router = express.Router();

const userDB = require("./userDb");

router.post("/", validateUser, (req, res) => {
  userDB.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
});

router.post("/:id/posts", validatePost, (req, res) => {

});

router.get("/", (req, res) => {
  userDB.get(req.query)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: 'uh oh'})
  })
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id
  userDB.getById(id)
  .then(found => {
    res.status(200).json(found)
  })
  .catch(error => {
    res.status(404).json({message: 'could not find id of user'})
  })
}); 

router.get("/:id/posts", validateUserId, (req, res) => {
const id = req.params.id
userDB.getUserPosts(id)
.then()
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
