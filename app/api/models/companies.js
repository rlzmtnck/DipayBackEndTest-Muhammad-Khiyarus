const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const Employees = require('./employees')
const companySchema = new Schema({
        company_name: {
            type: String,
            trim: true,		
            required: true,
        },
        telephone_number: {
            type: String,
            default: null,
            required: true,
        },
        is_active: {
            type: Boolean,
            default: false,
            required: true,
        },
        address: {
            type: String,
            
        }
    
	
});
companySchema.virtual('employees', {
    ref:'Employees',
    localField:'_id',
    foreignField:'company_id'
})
companySchema.pre('remove',async function(next){
    const company = this
    await Employees.remove({company_id:require.company._id})
    next();
})

module.exports = mongoose.model('Company', companySchema)