const express = require('express');
const { getProfile, updateProfile, uploadAvatar, rateUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.post('/profile/avatar', authMiddleware, uploadAvatar, (req, res) => {
    res.status(200).json({ message: 'Avatar uploaded' });
});
router.post('/:id/rate', authMiddleware, rateUser);

module.exports = router;
