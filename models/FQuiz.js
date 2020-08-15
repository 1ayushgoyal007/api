var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: String,
    live_time: String,
    questions: Array,
    title: String,
    email1: String,
    email2: String
})

module.exports = mongoose.model('FQuiz',schema);