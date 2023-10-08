
const companyModel = require('../models/companies');					

module.exports = {
	getById: function(req, res, next) {
		
		companyModel.findById(req.params.companyId, function(err, companyInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:200, code: "200", data:{"id": companyInfo.id, "name": companyInfo.company_name, "telephone_number": companyInfo.telephone_number, "is_active": companyInfo.is_active, "address": companyInfo.address}, message: "success"});
			}
		});
	},

	getAll: function(req, res, next) {
		let companylist = [];

		companyModel.find({}, function(err, companies){
			if (err){
				next(err);
			} else{
				for (let company of companies) {
					companylist.push({id: company._id, company_name: company.company_name, telephone_number: company.telephone_number, is_active: company.is_active, address: company.address });
				}
				res.json({status:200, code:"200", data:{count: companylist.length, rows: companylist}, message: "Success"});
							
			}

		});
	},

	updateById: function(req, res, next) {
		companyModel.findByIdAndUpdate(req.params.companyId,{company_name:req.body.company_name, telephone_number:req.body.telephone_number, is_active:req.body.is_active, address:req.body.address}, function(err, companyInfo){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Company updated successfully!!!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		companyModel.findByIdAndRemove(req.params.companyId, function(err, companyInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Company deleted successfully!!!", data:null});
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