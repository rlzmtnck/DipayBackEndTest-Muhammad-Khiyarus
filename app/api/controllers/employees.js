
const employeeModel = require('../models/employees');					

module.exports = {
	getById: function(req, res, next) {
		
		employeeModel.findById({_id : req.params.employeeId}, function(err, result){
            
			if (err) {
				next(err);
			} else {
                res.json({status:200, code: "200", data:{"id": result.id, "name": result.name, "phone_number": result.phone_number, "jobtitle": result.jobtittle}, message: "success"});

			}
		});
	},

	getAll: function(req, res, next) {
		let employeelist = [];

		employeeModel.find({}, function(err, employees){
			if (err){
				next(err);
			} else{
				for (let employee of employees) {
					employeelist.push({id: employee._id, name: employee.name, email: employee.email, phone_number: employee.phone_number, jobtittle: employee.jobtittle, company_id: employee.company_id });
				}
				res.json({status:200, code:"200", data:{count: employeelist.length, rows: employeelist}, message: "Success"});
							
			}

		});
	},

	updateById: function(req, res, next) {
		employeeModel.findByIdAndUpdate(req.params.employeeId,{name:req.body.name, phone_number:req.body.phone_number, jobtittle:req.body.jobtittle, company_id:req.body.company_id}, function(err, employeeInfo){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Employee updated successfully!!!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		employeeModel.findByIdAndRemove(req.params.employeeId, function(err, employeeInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Employee deleted successfully!!!", data:null});
			}
		});
	},

	// create: function(req, res, next) {
	// 	movieModel.create({ name: req.body.name, released_on: req.body.released_on }, function (err, result) {
	// 			  if (err) 
	// 			  	next(err);
	// 			  else
	// 			  	res.json({status: "success", message: "Movie added successfully!!!", data: null});
				  
	// 			});
	// },

}					