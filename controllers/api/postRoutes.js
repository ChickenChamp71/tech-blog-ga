const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }, { model: Comment, include: User }]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment, include: User }]
        });

        if (!postData) {
            res.status(404).json({ message: `No post found.` });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const postData = await Post.destroy({
            where: {
                id: postId
            }});

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/', async (req, res) => {
    try {

        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.put('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const postData = await Post.findByPk(postId);

        if (!postData) {
            res.status(404).json({ message: `No post found.` });
            return;
        };

        const updatedPost = await postData.update(req.body);
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;