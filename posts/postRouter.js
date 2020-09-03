const express = require('express');

const router = express.Router();

const postDb = require('./postDb')

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  return function(req,res,next){
    const id = req.params.id
    postDb.getById(id)
    .then(post)
  }
}

module.exports = router;
