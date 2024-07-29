const express = require('express');
const { createThread, getThreads, getThreadById, addComment, likeThread, dislikeThread } = require('../controllers/threadController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createThread);
router.get('/', getThreads);
router.get('/:id', getThreadById);
router.post('/:id/comments', authMiddleware, addComment);
router.post('/:id/like', authMiddleware, likeThread);
router.post('/:id/dislike', authMiddleware, dislikeThread);

module.exports = router;
