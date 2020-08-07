var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    number: String,
    qualification: String,
    institute: String
})

module.exports = mongoose.model("Professor", userSchema);