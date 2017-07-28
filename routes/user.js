var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
    User.find()
        .populate('user', 'firstName')
        .exec(function (err, users) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: users
            });
        });
});

router.post('/', function (req, res, next) {
    var user = new User({
    	firstName: req.body.firstName,
    	lastName: req.body.lastName,
        userId: req.body._id,
    	password: bcrypt.hashSync(req.body.password, 10),
    	email: req.body.email

    });
    user.save(function(err, result){
    	if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

router.post('/signin', function(req, res, next){
	User.findOne({email: req.body.email}, function(err, user){
		if(err){
			return res.status(500).json({
				title: 'errrrrrrorr',
				error: err
			});
		}
		if(!user){
			return res.status(500).json({
				title: 'Login failed',
				error: {message: 'Invalid login credentials'}
			});
		}
		if(!bcrypt.compareSync(req.body.password, user.password)){
			return res.status(401).json({
				title: 'Login failed',
				error: {message: 'Invalid login credentials'}
			});
		}
		//payload, secret/private key, options, callback
		var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
		res.status(200).json({
			message: 'Login success',
			token: token,
			userId: user._id,
            email: user.email,
			firstName: user.firstName
		});

	});
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(req.body.userId, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'No User Found!',
                error: {message: 'User not found'}
            });
        }
        if(user.email != decoded.user.email){
            return res.status(401).json({
                title: 'Not authenticated',
                error: {message: 'This is not yours to toy with'}
            });
        }
        user.userId = req.body._id;
        console.log("userId: " + user.userId);
        user.save(function(err, result) {
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

module.exports = router;
