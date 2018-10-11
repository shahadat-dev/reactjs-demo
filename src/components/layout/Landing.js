import React, { Component } from 'react'
import Login from '../auth/Login'

class Landing extends Component {
  render () {
    return (
      <div className='row justify-content-center p-5'>
        <div className='col-sm-6 mb-10'>
          <div>
            <h3 className='h3 pb-1'>Jobaer Sajeeb</h3>
            <hr />
          </div>
          <div className='text-right'>
            <p>Fullstack Developer</p>
            <a href='mailto:itsunclexo@gmail.com'>itsunclexo@gmail.com</a>

          </div>
        </div>
      </div>
    )
  }
}

export default Landing
