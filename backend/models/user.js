const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
    goals: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Goal'
    }],
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);