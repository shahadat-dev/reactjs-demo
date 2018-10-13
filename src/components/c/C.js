import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Pagination from 'react-js-pagination'
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
  }
  componentDidMount () {
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
    this.setState({ activePage: pageNumber })
    this.props.listFakeUsers(pageNumber)
  }
  render () {
    const { isFakeAuthenticated } = this.props.fakeAuth

    const user = isFakeAuthenticated ? this.props.fakeAuth.fakeUser.email : null

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
            className='badge badge-danger float-right p-2'
              >
            <span className='h6'>Logout</span>
          </button>}
          <h3 className='h3 pb-1'>Dashboard</h3>

          {/* {success && <Message msg={success} type='alert-success' />}
            {error && <Message msg={error} type='alert-danger' />} */}
          <h5 className='bg-light p-1'>
              Logged in as: {user}
          </h5>

          <div className='container'>
            <table className='table table-striped table-hover'>
              <thead>
                <tr className='row'>
                  <th scope='col' className='col-sm-2'>Id</th>
                  <th scope='col' className='col-sm-5'>First_Name</th>
                  <th scope='col' className='col-sm-5'>Last_Name</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                    users.map(user => (
                      <tr className='row' key={user.id}>
                        <td className='col-sm-2'>{user.id}</td>
                        <td className='col-sm-5'>{user.first_name}</td>
                        <td className='col-sm-5'>{user.last_name}</td>
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
