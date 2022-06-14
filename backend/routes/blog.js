const blogRouter = require('express').Router();
const Blog = require('../models/blog');

// TODO add Routes for blog

// Get latest N posts
blogRouter.get('/', async (req, res) => {
    Blog.findLast(numberOfPosts=8)
      .then((posts) => {
        res.json(posts);
      })
      .catch((err) => {
        res.status(500).send('Error retrieving blog posts from database');
      });
  });

  blogRouter.post('/', (req, res) => {
    const error = Blog.validate(req.body);
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      Blog.create(req.body)
        .then((createdPost) => {
          res.status(201).json(createdPost);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error saving the post');
        });
    }
  });

module.exports = blogRouter;
