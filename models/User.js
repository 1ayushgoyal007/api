var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    number: String,
    gender:String,
    qualification: String,
    institute: String
})

module.exports = mongoose.model("Professor", userSchema);