const express = require('express');
const { createTag, getTags } = require('../controllers/tagController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('admin'), createTag);
router.get('/', getTags);

module.exports = router;
