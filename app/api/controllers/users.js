const userModel = require('../models/users');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');	
		
// import {body} from 'express-validator'

// export const loginValidator = [
//   body('username', 'Invalid does not Empty').not().isEmpty(),
//   body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
// ]

// export const createValidator = [
//   body('user.username', 'username does not Empty').not().isEmpty(),
  
//   body('user.password', 'password does not Empty').not().isEmpty(),
//   body('user.password', 'The minimum password length is 6 characters').isLength({min: 6}),
// ]

module.exports = {
	create: function(req, res, next) {
		
		userModel.create({ username: req.body.username, password: req.body.password }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Admin added successfully!!!", data: null});
				  
				});
	},

	authenticate: function(req, res, next) {
		userModel.findOne({username:req.body.username}, function(err, userInfo){
					if (err) {
						next(err);
					} else {

						if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

						 const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 

						 res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});	

						}else{

							res.json({status:"error", message: "Invalid email/password!!!", data:null});

						}
					}
				});
	},

}					
