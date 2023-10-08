const { body, validationResult } = require('express-validator')
const empValidationRules = () => {
  return [
    
    body('name', 'Invalid does not Empty').not().isEmpty(),
    body('name', 'Min 2 , Max 50 Character').isLength({ min: 2, max: 50 }),  
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Min 5 , Max 55 Character').isLength({ min: 5, max: 255 }),  
    body('phone_number', 'Min 8 , Max 16 Character').isLength({ min: 8, max: 16 }),  
   
    // // body('is_active', 'Invalid does not Empty').not().isEmpty(),
      ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
    empValidationRules,
  validate,
}