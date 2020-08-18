var mongoose = require('mongoose');

var quizSchema = mongoose.Schema({

    name: String,
    live_time: String,
    questions: Array,
    title: String,
    date: String
});

module.exports = mongoose.model('Quiz',quizSchema);