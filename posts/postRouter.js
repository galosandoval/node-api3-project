const express = require("express");

const router = express.Router();

const postDb = require("./postDb");

router.get("/", (req, res) => {
  postDb.get(req.query)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    console.log('Heres the error', error)
    res.status(500).json({message: 'oh no'})
  })
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
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
