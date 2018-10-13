import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { listUsers } from '../../actions/userActions'

class User extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      errors: {}
    }
  }
  componentDidMount () {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }

    // List Users
    this.props.listUsers()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    this.setState({
      users: nextProps.users
    })
  }

  render () {
    const users = this.state.users.users
    const items =
      users &&
      users.map(user => {
        return (
          <tr key={user._id}>
            <td>{user.firstName} {' '} {user.lastName}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <button className='btn btn-success'>Edit</button>
              {' '}
              <button className='btn btn-danger'>Delete</button>
            </td>
          </tr>
        )
      })
    return (
      <div>
        <div className='pt-2'>
          <h3 className='float-left'>User</h3>
          <button className='btn btn-info float-right'>Add New</button>
        </div>
        <table className='table table-hover table-striped'>
          <thead>
            <tr className='table-info'>
              <th scope='col'>Name</th>
              <th scope='col'>Username</th>
              <th scope='col'>Email</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
    )
  }
}

User.propTypes = {
  listUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  users: state.users
})

export default connect(mapStateToProps, { listUsers })(withRouter(User))
