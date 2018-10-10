import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Message from '../common/Message'
import { withRouter } from 'react-router-dom'

class C extends Component {
  constructor () {
    super()
    this.state = {
      server: {},
      errors: {}
    }

    // this.changeHandler = this.changeHandler.bind(this)
    // this.submitHandler = this.submitHandler.bind(this)
  }
  componentDidMount () {
    console.log(this.props.fakeAuth)
    if (!this.props.fakeAuth.isAuthenticated) {
      this.props.history.push('/')
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if (nextProps.server) {
      this.setState({ server: nextProps.server })
    }
  }
  render () {
    const { success, error } = this.state.server
    return (
      <div className='row justify-content-center p-5'>
        <div className='col-sm-6 mb-10'>
          <h3 className='h3 pb-1'>C</h3>
          {success && <Message msg={success} type='alert-success' />}
          {error && <Message msg={error} type='alert-danger' />}
        </div>
      </div>
    )
  }
}

C.propTypes = {
  fakeAuth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  fakeAuth: state.fakeAuth,
  server: state.server
})

export default connect(mapStateToProps, {})(withRouter(C))
