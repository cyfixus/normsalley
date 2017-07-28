var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Blog = require('../models/blog');

var User = require('../models/user');



router.get('/', function (req, res, next) {
    Blog.find()
        .populate('user', 'firstName')
        .exec(function (err, blogs) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: blogs
            });
        });
});

router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if(err){
            return res.status(401).json({
                title: 'Not authenticated',
                error: err
            });
        }
        next();
    });
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            tag: req.body.tag,
            user: user
        });
        blog.save(function (err, result) {
            if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                });
            }
            user.blogs.push(result);
            user.save();
                //save user in message and message in user
            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });
    });
});



router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!blog) {
            return res.status(500).json({
                title: 'No Blog Found!',
                error: {message: 'Message not found'}
            });
        }
        if(blog.user != decoded.user._id){
            return res.status(401).json({
                title: 'Not authenticated',
                error: {message: 'This is not yours to toy with'}
            });
        }
        blog.title = req.body.title;
        blog.content = req.body.content;
        blog.tag = req.body.tag;
        blog.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!blog) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        if(blog.user != decoded.user._id){
            return res.status(401).json({
                title: 'Not authenticated',
                error: {message: 'This is not yours to toy with'}
            });
        }
        blog.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});

module.exports = router;