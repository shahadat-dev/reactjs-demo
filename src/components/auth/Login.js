import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Message from '../common/Message'
import { loginUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

import validateLoginInput from '../validation/auth/login'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {},
      server: {}
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    if (nextProps.server) {
      this.setState({ server: nextProps.server })
    }
  }

  changeHandler (event) {
    console.log(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  isValid (data) {
    const { errors, isValid } = validateLoginInput(data)
    if (!isValid) {
      this.setState({ errors })
    }
    return isValid
  }

  submitHandler (event) {
    event.preventDefault()
    console.log(this.state)
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    if (this.isValid(userData)) {
      this.setState({ errors: {} })
      this.props.loginUser(userData)
    }
  }

  render () {
    const { errors } = this.state
    const { success, error } = this.state.server
    console.log(this.state, success, error)
    return (
      <div className='container center'>
        <div className='row justify-content-center p-5'>

          <div className='col-sm-6 mb-10'>
            {success && <Message msg={success} type='alert-success' />}
            {error && <Message msg={error} type='alert-danger' />}
            <h3 className='h3 pb-1'>Admin Panel Login</h3>
            <hr />
            <form noValidate onSubmit={this.submitHandler}>
              <fieldset>
                <div className='form-group'>
                  <label htmlFor='email'>Email address</label>
                  <TextFieldGroup
                    placeholder='Email Address'
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
                    placeholder='Password'
                    name='password'
                    type='password'
                    id='password'
                    value={this.state.password}
                    onChange={this.changeHandler}
                    error={errors.password}
                  />
                </div>

                <button type='submit' className='btn btn-info btn-lg btn-block'>
                  Login
                </button>

              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  server: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  server: state.server
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login))
