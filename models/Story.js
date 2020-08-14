var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
    story: String
});

module.exports = mongoose.model('Story', storySchema);