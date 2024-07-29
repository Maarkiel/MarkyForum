const Tag = require('../models/tagModel');

exports.createTag = async (req, res) => {
    const { name } = req.body;
    try {
        const tag = new Tag({ name });
        await tag.save();
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
