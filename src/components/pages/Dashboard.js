import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'

class Dashboard extends Component {
  componentDidMount () {
    console.log(this.props.auth)
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  render () {
    return <h3>Dashboard</h3>
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(withRouter(Dashboard))
