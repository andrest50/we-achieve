const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Goal = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    goal: {
        type: String,
        default: ''
    },
    priority: {
        type: Number,
        default: 1
    },
    category: {
        type: String,
        default: ''
    },
    private: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    due: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Goal', Goal);