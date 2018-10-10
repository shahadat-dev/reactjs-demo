import React from 'react'
import { Link } from 'react-router-dom'

const More = () => {
  return (
    <div className='row justify-content-center p-5'>
      <div className='col-sm-6 mb-10'>
        <Link className='badge badge-warning' to='/login'>
          Login
        </Link>
        &nbsp;
        <Link className='badge badge-warning' to='/register'>
          Register
        </Link>
      </div>
    </div>
  )
}

export default More
