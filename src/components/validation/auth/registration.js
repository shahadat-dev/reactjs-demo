import Validator from 'validator'
const isEmpty = require('../is-empty')

const validateRegistrationInput = data => {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.pasword2 = !isEmpty(data.pasword2) ? data.pasword2 : ''

  // Name
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required'
  }

  // Email
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  // Password
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
    errors.password = 'Password must be at least 4 characters'
  }

  // Password2
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password is required'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Password must be match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validateRegistrationInput
