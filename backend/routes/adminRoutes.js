const express = require('express');
const { getStats } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/stats', authMiddleware, roleMiddleware('admin'), getStats);

module.exports = router;
