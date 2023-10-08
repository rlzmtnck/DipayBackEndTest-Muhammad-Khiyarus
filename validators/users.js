const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    // username must be an email
    body('username', 'Invalid does not Empty').not().isEmpty(),
    body('username', 'Max 30 Character').isLength({ min: 5, max: 30 }),  
    // password must be at least 5 chars long
    body('password', 'Invalid does not Empty').not().isEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({ min: 6, max: 30 }),
  ]
}
const loginValidator = () => {
    return [
        body('username', 'Invalid does not Empty').not().isEmpty(),
        body('password', 'The minimum password length is 6 characters').isLength({ min: 6, max: 30 }),
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
  userValidationRules,
  validate,
  loginValidator,
}