import React from 'react'
import { Link } from 'react-router-dom'

const More = () => {
  return (
    <div className="row justify-content-center p-5">
      <div className="col-sm-6 mb-10 justify-content-center">
        <p>
          Real Login/Registration implemented here. Express server is hosted at{' '}
          <a href="https://www.heroku.com/">Heroku</a> and MongoDB hosted at{' '}
          <a href="https://mlab.com/">mlab.com</a>
        </p>
        <div>
          <Link className="btn btn-info btn-lg" to="/login">
            Login
          </Link>
          &nbsp;
          <Link className="btn btn-success btn-lg" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default More
