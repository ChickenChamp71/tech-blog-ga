const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        include:[User]
    })
    .then (postData => {
        const posts = postData.map((post) => post.get({ plain: true }));

        console.log(posts);

        res.render('home', {
            allPosts: posts,
            logged_in: req.session.logged_in
        });
    });
});

router.get('/post/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        include: [User, Comment]
    })
    .then (postData => {
        const post = postData.get({ plain: true });
        post.logged_in = req.session.logged_in;
        console.log(post);

        res.render('singlePost', post)
    });
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        return res.redirect('/dashboard')
    };

    res.render('login', {
        logged_in: req.session.logged_in
    });
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        return res.redirect('/dashboard');
    };

    res.render('signup');
});

router.get('/dashboard', (req, res) => {
    if (!req.session.logged_in) {
        return res.redirect('/login');
    } else {
        User.findByPk(req.session.user_id, {
            include: [Post],
        })
        .then(userData => {
            const user = userData.get({ plain: true });
            console.log(user);
            user.logged_in = req.session.logged_in;

            res.render('dashboard', user);
        });
    };
});

module.exports = router;