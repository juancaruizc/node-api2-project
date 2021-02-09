// implement your posts router here

const Post = require('./posts-model');
const express = require('express');
const router = express.Router();

// GET request - grabs all posts
router.get('/', (req, res) => {
  Post.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The posts information could not be retrieved' });
    });
});

// GET request - grabs specified post based on id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The post information could not be retrieved' });
    });
});

// GET request - grabs comments based on id
router.get('/:id/comments', (req, res) => {
  const postId = req.params.id;
  Post.findPostComments(postId)
    .then((comment) => {
      if (comment.length > 0) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({
          message: 'The comment with the specified ID does not exist',
        });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The comments information could not be retrieved' });
    });
});

// POST request - creates a new post
router.post('/', (req, res) => {
  Post.insert(req.body)
    .then((newPost) => {
      if (newPost) {
        res.status(201).json(newPost);
      } else {
        res
          .status(400)
          .json({ message: 'Please provide title and contents for the post' });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'There was an error while saving the post to the database',
      });
    });
});

// PUT request - updated the post
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Post.update(id, changes)
    .then((updatedPost) => {
      if (!id) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      } else if (!changes) {
        res
          .status(400)
          .json({ message: 'Please provide title and contents for the post' });
      } else {
        res.status(200).json(updatedPost);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The post information could not be modified' });
    });
});

// DELETE request - deletes the specified post
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Post.remove(id)
    .then((post) => {
      if (post) {
        res.status(200).json({ message: 'User was deleted' });
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'The post could not be removed' });
    });
});

module.exports = router;
