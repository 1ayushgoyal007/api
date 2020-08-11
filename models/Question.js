var mongoose  = require('mongoose');

var questionSchema = mongoose.Schema({
    question: String,
    options:Array,
    answer : String
})


module.exports = mongoose.model('Question', questionSchema);