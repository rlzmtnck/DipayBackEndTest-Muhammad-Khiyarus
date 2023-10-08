const { body, validationResult } = require('express-validator')
const compValidationRules = () => {
  return [
    
    body('company_name', 'Invalid does not Empty').not().isEmpty(),
    body('company_name', 'Min 3 , Max 50 Character').isLength({ min: 3, max: 50 }),  
   
    body('telephone_number', 'Min 8 , Max 16 Character').isLength({ min: 8, max: 16 }),  
    // body('is_active', 'Invalid does not Empty').not().isEmpty(),
    body('address', 'Min 10 , Max 50 Character').isLength({ min: 10, max: 50 }),  
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
    compValidationRules,
  validate,
}