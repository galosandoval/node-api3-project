const express = require("express");
const server = express();
const helmet = require("helmet");
const userRouter = require("./users/userRouter");
const postRouter = require('./posts/postRouter')

server.use(helmet());
server.use(express.json());
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)
server.use(logger());

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger() {
  return function (req, res, next) {
    console.log(
      `Request Method: ${req.method}, Request URL: ${
        req.url
      }, Date: ${Date.getTime()}`
    );
    next();
  };
}

function validateUserId() {
  return function (req, res, next){
    
  }
}

module.exports = server;
