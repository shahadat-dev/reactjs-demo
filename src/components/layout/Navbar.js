import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

class Navbar extends Component {
  onLogoutClick (e) {
    e.preventDefault()
    this.props.logoutUser()
  }
  render () {
    const { isAuthenticated, user } = this.props.auth
    const { isFakeAuthenticated, fakeUser } = this.props.fakeAuth

    const authLinks = (
      <a
        onClick={this.onLogoutClick.bind(this)}
        href='#'
        className='badge badge-danger'
      >
        Logout from Real Server
      </a>
    )

    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-info'>
        <Link className='navbar-brand' to='/'>PincTest</Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarColor01'
          aria-controls='navbarColor01'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarColor01'>

          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/a'>A</Link>
            </li>
            {!isFakeAuthenticated &&
              <li className='nav-item'>
                <Link className='nav-link' to='/b'>B(Login)</Link>
              </li>}
            {isFakeAuthenticated &&
              <li className='nav-item'>
                <Link className='nav-link' to='/c'>C(Dashboard)</Link>
              </li>}
            <li className='nav-item'>
              <Link className='nav-link' to='/more'>More</Link>
            </li>
          </ul>
          : <ul className='navbar-nav mr-auto' />

          <div className='form-inline my-2 my-lg-0'>
            {isAuthenticated &&
              <a className='badge badge-pill badge-light' href='#'>
                {user.username}
              </a>}
            &nbsp;
            {isAuthenticated && authLinks}
          </div>

        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  fakeAuth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  fakeAuth: state.fakeAuth
})

export default connect(mapStateToProps, { logoutUser })(Navbar)
