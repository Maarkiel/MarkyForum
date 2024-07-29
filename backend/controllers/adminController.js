const Thread = require('../models/threadModel');
const User = require('../models/userModel');

exports.getStats = async (req, res) => {
    try {
        const threadCount = await Thread.countDocuments();
        const userCount = await User.countDocuments();
        const activeUsers = await User.find().sort('-lastActive').limit(10);
        res.json({ threadCount, userCount, activeUsers });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
