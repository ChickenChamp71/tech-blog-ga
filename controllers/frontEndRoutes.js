const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {

    if (req.session.logged_in = undefined) {
        req.session.logged_in = false;
        console.log(req.session.logged_in)
    }
    Post.findAll({
        include:[{ model: User, attributes: ["username"] }]
    })
    .then (postData => {
        const posts = postData.map(post => post.get({ plain: true }));

        console.log(posts);

        res.render('home', {
            allPosts: posts,
        });
    });
});

router.get('/post/:id', (req, res) => {
    if (req.session.logged_in = undefined) {
        req.session.logged_in = false;
        console.log(req.session.logged_in)
    }
    if (!req.session.logged_in) {
        return res.redirect("/login");
    } else {
         
        Post.findByPk(req.params.id, {
            include: [{model: User}, {model: Comment}]
        })
        .then (postData => {
            const comments = Comment.findByPk(req.params.comment_id, {
                include: [{ model: User, attributes: ["username"] }]
            })
            const post = postData.get({ plain: true });
            post.logged_in = req.session.logged_in;
            comments.get({ plain: true });
            console.log(post);

            res.render('singlePost', {
                singlePost: post,
                comments: comments
            })
        });
    }
 
});

router.get('/login', (req, res) => {
    if (req.session.logged_in = undefined) {
        req.session.logged_in = false;
        console.log(req.session.logged_in)
    }
    if (!req.session.logged_in) {
        console.log('hihi')
        res.render('login');
    } else {
        return res.redirect('/dashboard')
    };

    
});

router.get('/signup', (req, res) => {

    if (req.session.logged_in = undefined) {
        req.session.logged_in = false;
        console.log(req.session.logged_in)
    }
    if (!req.session.logged_in) {
        console.log("it's here")
        res.render('signup');
    } else {
        return res.redirect('/dashboard');
    };
});

router.get('/dashboard', (req, res) => {
    if (req.session.logged_in = undefined) {
        req.session.logged_in = false;
        console.log(req.session.logged_in)
    }
    if (!req.session.logged_in) {
        return res.redirect('/login');
    } else {
        User.findByPk(req.session.user_id, {
            include: [{ model: Post }],
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