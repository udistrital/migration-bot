var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var gitSchema = new Schema({
	'commit' : Number
});

module.exports = mongoose.model('git', gitSchema);
