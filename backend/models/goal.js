const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Goal = new Schema({
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