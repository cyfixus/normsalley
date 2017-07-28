var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    userId: {type: String},
    email: {type: String, required: true, unique: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    blogs: [{type: Schema.Types.ObjectId, ref: 'Blog'}],
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);