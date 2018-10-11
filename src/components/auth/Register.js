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
      name: '',
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    console.log(newUser)
    this.props.registerUser(newUser, this.props.history)
    this.props.history.push('/login')
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
                  <label htmlFor='name'>Name</label>
                  <TextFieldGroup
                    placeholder='Enter Name'
                    name='name'
                    id='name'
                    value={this.state.name}
                    onChange={this.changeHandler}
                    error={errors.name}
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
