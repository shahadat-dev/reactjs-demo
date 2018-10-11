import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Message from '../common/Message'
import Spinner from '../common/Spinner'
import { logoutFakeUser } from '../../actions/fakeAuthActions'
import { listFakeUsers } from '../../actions/fakeUserActions'

class C extends Component {
  constructor () {
    super()
    this.state = {
      fakeUsers: {},
      server: {},
      errors: {},
      activePage: 1
    }

    // this.submitHandler = this.submitHandler.bind(this)
  }
  componentDidMount () {
    console.log(this.props.fakeAuth)
    if (!this.props.fakeAuth.isFakeAuthenticated) {
      this.props.history.push('/')
    }

    // Get users
    this.props.listFakeUsers(this.state.activePage)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if (nextProps.server) {
      this.setState({ server: nextProps.server })
    }
    if (nextProps.fakeUsers) {
      this.setState({ fakeUsers: nextProps.fakeUsers })
    }
  }

  fakeLogoutHandler () {
    // Logout fake user
    this.props.logoutFakeUser()
  }

  handlePageChange (pageNumber) {
    console.log(`active page is ${pageNumber}`)
    this.setState({ activePage: pageNumber })
    this.props.listFakeUsers(pageNumber)
  }
  render () {
    console.log(this.state)
    const { success, error } = this.state.server
    const { isFakeAuthenticated } = this.props.fakeAuth
    const users = this.state.fakeUsers.fakeUsers
      ? this.state.fakeUsers.fakeUsers.data
      : []

    const content = this.state.fakeUsers.loading
      ? <Spinner />
      : <div className='row justify-content-center p-5'>
        <div className='col-sm-6 mb-10'>

          {isFakeAuthenticated &&
          <button
            onClick={this.fakeLogoutHandler.bind(this)}
            className='badge badge-danger float-right'
              >
                Logout
              </button>}
          <h3 className='h3 pb-1'>Dashboard</h3>

          {/* {success && <Message msg={success} type='alert-success' />}
            {error && <Message msg={error} type='alert-danger' />} */}
          <h5 className='bg-light p-1'>
              Logged in as: {JSON.parse(this.props.fakeAuth.fakeUser).email}
          </h5>

          <div>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                    users.map(user => (
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                      </tr>
                    ))}

              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={3}
                      totalItemsCount={12}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                      linkClass='page-link'
                      itemClass='page-item'
                      />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    return content
  }
}

C.propTypes = {
  listFakeUsers: PropTypes.func.isRequired,
  logoutFakeUser: PropTypes.func.isRequired,
  fakeAuth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  fakeAuth: state.fakeAuth,
  server: state.server,
  fakeUsers: state.fakeUsers
})

export default connect(mapStateToProps, { listFakeUsers, logoutFakeUser })(
  withRouter(C)
)
