import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { listUsers } from '../../actions/userActions'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      users: {},
      errors: {}
    }
  }
  componentDidMount () {
    console.log(this.props.auth)
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }

    // List users
    this.props.listUsers()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.users) {
      this.setState({ users: nextProps.users })
    }
  }

  render () {
    const { users } = this.state.users
    return (
      <div className='row justify-content-center p-5'>
        <div className='col-sm-6 mb-10 justify-content-center'>
          <h2>Dashboard</h2>
          <h5 className='bg-light p-1'>
            You're logged in as: {this.props.auth.user.name}
          </h5>
          <hr />
          <h4>Registered Users</h4>
          <ul>
            {users &&
              users.map(user => (
                <li>
                  <strong>{user.name}</strong>
                  {' '}
                  <i>
                    <small>(registered at {moment(user.date).fromNow()})</small>
                  </i>
                </li>
              ))}
          </ul>

        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  listUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
})

export default connect(mapStateToProps, { listUsers })(withRouter(Dashboard))
