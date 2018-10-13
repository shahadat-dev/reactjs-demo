import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import { fakeLogin } from '../../actions/fakeAuthActions'

import validateLoginInput from '../validation/auth/login'

class B extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidMount () {
    if (this.props.fakeAuth.isFakeAuthenticated) {
      this.props.history.push('/c')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.fakeAuth.isFakeAuthenticated) {
      this.props.history.push('/c')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  changeHandler (event) {
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
    const loginData = {
      email: this.state.email,
      password: this.state.password
    }

    if (this.isValid(loginData)) {
      this.setState({ errors: {} })
      this.props.fakeLogin(loginData)
    }
  }

  render () {
    const { errors } = this.state
    return (
      <div className='container center'>
        <div className='row justify-content-center p-5'>

          <div className='col-sm-6 mb-10'>
            <h3 className='h3 pb-1'>Fake Login</h3>
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

B.propTypes = {
  fakeLogin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  fakeAuth: state.fakeAuth,
  errors: state.errors
})

export default connect(mapStateToProps, { fakeLogin })(withRouter(B))
