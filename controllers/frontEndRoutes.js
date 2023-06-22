const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        include:[User]
    })
    .then (postData => {
        const posts = postData.map((post) => {
            post.get({ plain: true })
        });

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
    })
});

