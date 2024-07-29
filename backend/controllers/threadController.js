const Thread = require('../models/threadModel');

exports.createThread = async (req, res) => {
    const { title, content, category, tags } = req.body;
    try {
        const thread = new Thread({ title, content, category, tags, author: req.user._id });
        await thread.save();
        res.status(201).json(thread);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getThreads = async (req, res) => {
    try {
        const threads = await Thread.find().populate('author category tags');
        res.json(threads);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getThreadById = async (req, res) => {
    const { id } = req.params;
    try {
        const thread = await Thread.findById(id).populate('author category tags comments.author');
        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }
        res.json(thread);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    try {
        const thread = await Thread.findById(id);
        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }
        thread.comments.push({ comment, author: req.user._id });
        await thread.save();
        res.status(201).json(thread);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.likeThread = async (req, res) => {
    const { id } = req.params;
    try {
        const thread = await Thread.findById(id);
        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }
        thread.likes = (thread.likes || 0) + 1;
        await thread.save();
        res.json(thread);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.dislikeThread = async (req, res) => {
    const { id } = req.params;
    try {
        const thread = await Thread.findById(id);
        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }
        thread.dislikes = (thread.dislikes || 0) + 1;
        await thread.save();
        res.json(thread);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
