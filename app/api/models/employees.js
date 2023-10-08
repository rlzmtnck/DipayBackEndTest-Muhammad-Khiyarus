const mongoose = require('mongoose');
const validator = require('validator')
//Define a schema

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
	name: {
		type: String,		
		required: true,
	},
	email: {
		type: String,
        required: 'Email address is required',
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is in valid')
            }
        },
        lowercase: true,
        unique: true,
        trim: true,
        
        
	},
    phone_number: {
		type: String,
		default: null,
		
	},
    jobtittle: {
        type: String,
        enum: ['manager', 'director', 'staff'],
        default: 'staff',
        required: true,

    },
    company_id: {
        type:mongoose.Schema.Types.ObjectId, 
        required:true, 
        ref: 'Company' 
    },
});

module.exports = mongoose.model('Employee', EmployeeSchema)