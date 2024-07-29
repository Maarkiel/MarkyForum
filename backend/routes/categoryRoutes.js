const express = require('express');
const { createCategory, getCategories } = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('admin'), createCategory);
router.get('/', getCategories);

module.exports = router;
