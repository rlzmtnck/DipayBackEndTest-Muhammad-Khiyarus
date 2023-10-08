const express = require('express');
const router = express.Router();
const userModel = require('../app/api/models/users');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');	
const { userValidationRules, validate, loginValidator } = require ('../validators/users');
const { check, validationResult } = require('express-validator')
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

router.post('/register', userValidationRules(), validate, (req, res) => {

    userModel.create({
      username: req.body.username,
      password: req.body.password,
    }).then(user => res.json(user))
  }

);
// router.post('/login', userController.authenticate);
router.post('/login', loginValidator(), validate, (req, res) => {
    userModel.findOne({username:req.body.username}, function(err, userInfo){
        if (err) {
            next(err);
        } else {

            if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

             const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 

             res.json({status:201, code:"201", data:{token:token} , message: "success"});	

            }else{

                res.json({status:"error", message: "Invalid email/password!!!", data:null});

            }
        }
    });
});
module.exports = router;