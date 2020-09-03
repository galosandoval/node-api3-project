const express = require("express");

const router = express.Router();

const postDb = require("./postDb");

router.get("/", (req, res) => {
  postDb
    .get(req.query)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log("Heres the error", error);
      res.status(500).json({ message: "oh no" });
    });
});

router.get("/:id", validatePostId(), (req, res) => {
  const id = req.params.id;
  postDb
    .getById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log("Heres the error", error);
      res.status(500).json({ message: "oh no" });
    });
});

router.delete("/:id", validatePostId(), (req, res) => {
  const id = req.params.id;
  postDb
    .remove(id)
    .then((post) => {
      res.status(200).json({ message: "successfully deleted post" });
    })
    .catch((error) => {
      console.log("Heres the error", error);
      res.status(500).json({ message: "oh no" });
    });
});

router.put("/:id", validatePostId(), (req, res) => {
  const id = req.params.id;
  const change = req.body
  postDb.update(id, change)
  .then(change => {
    res.status(200).json({message: 'successfully updated the post'})
  })
  .catch((error) => {
    console.log("Heres the error", error);
    res.status(500).json({ message: "oh no" });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  return function (req, res, next) {
    const id = req.params.id;
    postDb
      .getById(id)
      .then((post) => {
        if (post) {
          next();
        } else {
          res.status(400).json({ message: "missing post data" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "error 500" });
      });
  };
}

module.exports = router;
