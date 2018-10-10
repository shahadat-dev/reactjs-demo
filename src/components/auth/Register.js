import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import { registerUser } from '../../actions/authActions'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  changeHandler (event) {
    // console.log(event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  submitHandler (event) {
    event.preventDefault()
    // console.log(this.state)
    const newUser = {
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
      homePhone: this.state.homePhone,
      cellularPhone: this.state.cellularPhone
    }

    this.props.registerUser(newUser, this.props.history)
  }
  render () {
    const { errors } = this.state
    if (errors) {
      console.log(errors)
    }

    const { user } = this.props.auth

    return (
      <div className='container center'>
        <div className='row justify-content-center p-5'>
          <div className='col-sm-6 mb-10'>
            <h3 className='h3 pb-1'>Register</h3>
            <hr />
            <form
              noValidate
              onSubmit={this.submitHandler.bind(this)}
              method='POST'
            >
              <fieldset>
                <div className='form-group'>
                  <label htmlFor='firstName'>First Name</label>
                  <TextFieldGroup
                    placeholder='Enter First Name'
                    name='firstName'
                    id='firstName'
                    value={this.state.firstName}
                    onChange={this.changeHandler}
                    error={errors.firstName}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='middleName'>Middle Name</label>
                  <TextFieldGroup
                    placeholder='Enter Middle Name'
                    name='middleName'
                    id='middleName'
                    value={this.state.middleName}
                    onChange={this.changeHandler}
                    error={errors.middleName}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='lastName'>Last Name</label>
                  <TextFieldGroup
                    placeholder='Enter Last Name'
                    name='lastName'
                    id='lastName'
                    value={this.state.lastName}
                    onChange={this.changeHandler}
                    error={errors.lastName}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='username'>Username</label>
                  <TextFieldGroup
                    placeholder='Enter Username'
                    name='username'
                    id='username'
                    value={this.state.username}
                    onChange={this.changeHandler}
                    error={errors.username}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>Email Address</label>
                  <TextFieldGroup
                    placeholder='Enter Email'
                    name='email'
                    type='email'
                    id='email'
                    value={this.state.email}
                    onChange={this.changeHandler}
                    error={errors.email}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <TextFieldGroup
                    placeholder='Enter Password'
                    name='password'
                    type='password'
                    id='password'
                    value={this.state.password}
                    onChange={this.changeHandler}
                    error={errors.password}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password2'>Repeat Password</label>
                  <TextFieldGroup
                    placeholder='Repeat Password'
                    name='password2'
                    type='password'
                    id='password2'
                    value={this.state.password2}
                    onChange={this.changeHandler}
                    error={errors.password2}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='homePhone'>Home Phone</label>
                  <TextFieldGroup
                    placeholder='Enter Home Phone'
                    name='homePhone'
                    id='homePhone'
                    value={this.state.homePhone}
                    onChange={this.changeHandler}
                    error={errors.homePhone}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='cellularPhone'>Cellular Phone</label>
                  <TextFieldGroup
                    placeholder='Enter Cellular Phone'
                    name='cellularPhone'
                    id='cellularPhone'
                    value={this.state.cellularPhone}
                    onChange={this.changeHandler}
                    error={errors.cellularPhone}
                  />
                </div>

                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>

              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
