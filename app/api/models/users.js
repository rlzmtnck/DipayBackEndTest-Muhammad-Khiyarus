const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
	
	username: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	}
});

AdminSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});

module.exports = mongoose.model('User', AdminSchema);