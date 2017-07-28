var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var schema = new Schema({
	title: {type: String, required: true},
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    tag: {type: String}
});

//mongoose middleware

schema.post('remove', function(blog){
	User.findById(blog.user, function(err, user){
		user.blogs.pull(blog);
		user.save();
	});
});

module.exports = mongoose.model('Blog', schema);