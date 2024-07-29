const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' },
    resetToken: { type: String, default: '' },
    resetTokenExpiry: { type: Date, default: null },
    ratings: [
        {
            rating: { type: Number, required: true },
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
        }
    ],
    ratingAverage: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
