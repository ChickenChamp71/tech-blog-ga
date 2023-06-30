const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        await Post.findAll({
            include:[{ model: User, attributes: ["username"] }]
        }) .then((postData) => {
            const posts = postData.map(post => post.get({ plain: true }));

            if (!req.session.logged_in) {
                res.render('home', {
                    allPosts: posts,
                    logged_in: false
                })
            } else {
                res.render('home', {
                    allPosts: posts,
                    logged_in: req.session.logged_in
                });
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {

        if (!req.session.logged_in) {
            return res.redirect("/login");
        } else {
            const postData = await Post.findByPk(req.params.id, {
                include: [{model: User}, {model: Comment, include: { model: User, attributes: ["username"] }}]
            })

            const comments = [];

            for (let i = 0; i < postData.comments.length; i++) {
                const comment = postData.comments[i];
                const oneComment = await comment.get({ plain: true });
                comments.push(oneComment);
            }

            var user_true;

            if (postData.User.id = req.session.user_id) {
                user_true = true;
            } else {
                user_true = false;
            };

            const post = await postData.get({ plain: true });

            res.render('singlePost', {
                singlePost: post,
                comments: comments,
                logged_in: req.session.logged_in,
                user_true: user_true
            })
        };
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            return res.render('login', {
                logged_in: false
            });
        } else {
            return res.redirect('/dashboard')
        };
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/signup', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            return res.render('signup', {
                logged_in: false
            });
        } else {
            return res.redirect('/dashboard');
        };
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            return res.redirect('/login');
        } else {
            const userData = await User.findByPk(req.session.user_id, {
                include: { model: Post, include: [{
                    model: User, 
                    attributes: ["username"] 
                }]}
            });

            const postData = [];
            
            for (let i = 0; i < userData.posts.length; i++) {
                const post = userData.posts[i];
                const onePost = await post.get({ plain: true });
                postData.push(onePost);
            }
            
            const user = await userData.get({ plain: true });
        
            res.render('dashboard', {
                user: user,
                post: postData,
                logged_in: req.session.logged_in,
                user_id: req.session.user_id
            });
        };
    } catch (err) {
        res.status(500).json(err);
    };    
});


module.exports = router;