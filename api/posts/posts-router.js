// implement your posts router here
const express = require('express');

const router = express.Router();

const Post = require('./posts-model');

router.get('/', (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The posts information could not be retrieved' });
    });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Post.findById(id)
    .then((id) => {
      if (!id) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      } else {
        res.status(200).json(id);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The post information could not be retrieved' });
    });
});
router.post('/', (req, res) => {
  const newPost = req.body;
  const title = req.body.title;
  const contents = req.body.contents;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: 'Please provide title and contents for the post' });
  } else {
    Post.insert(newPost)
      .then(() => {
        res.status(201).json(newPost);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: 'The post information could not be modified' });
      });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!id) {
    res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist' });
  } else {
    Post.update(id, changes)
      .then((updatedPost) => {
        if (!changes.title || !changes.contents) {
          res.status(400).json({
            message: 'Please provide title and contents for the post',
          });
        } else {
          res.status(200).json(updatedPost);
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: 'The post information could not be modified' });
      });
  }
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist' });
  } else {
    Post.remove(id)
      .then((deletedUser) => {
        res.status(200).json(deletedUser);
      })
      .catch(() => {
        res.status(500).json({ message: 'The post could not be removed' });
      });
  }
});
router.get('/:id/comments', (req, res) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist' });
  } else {
    Post.findPostComments(id)
      .then((id) => {
        res.status(200).json(id);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: 'The comments information could not be retrieved' });
      });
  }
});

module.exports = router;
