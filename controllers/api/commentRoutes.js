const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: User }, { model: Post, include: User }]
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [{ model: User }, { model: Post, include: User }]
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found.' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create(req.body);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.delete('/', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.put('/', async (req, res) => {
    try {
        const commentData = await Comment.findByPk({
            where: {
                id: req.params.id
            }
        });
        
        if (!commentData) {
            res.status(404).json({ message: 'No comment found.' });
            return;
        };

        const updatedComment = await Comment.update(req.body);
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;