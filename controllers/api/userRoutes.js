const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: { model: Post, include: Comment }
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: { model: Post, include: Comment }
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found.' });
            return;
        };

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.delete('/', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    };
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        })

        if (userData == null) {
            return res.status(400).json({ message: 'Incorrect username or password. Please try again.' });
        };

        const correctPassword = await userData.checkPassword(req.body.password);

        if (!correctPassword) {
            return res.status(400).json({ message: 'Incorrect username or password. Please try again.' });
        } else {
            req.session.save(() => {
    
                req.session.user_id = userData.id;
                req.session.logged_in = true;

                res.status(200).json(userData);
            });
        }

    } catch (err) {
        res.status(400).json(err);
    };
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    };
});

module.exports = router;