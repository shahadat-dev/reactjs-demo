import React from 'react'

const Message = ({ msg, type }) => {
  return (
    <div class={`alert alert-dismissible ${type}`}>
      <button type='button' className='close' data-dismiss='alert'>
        ×
      </button>
      {msg}
    </div>
  )
}

export default Message
