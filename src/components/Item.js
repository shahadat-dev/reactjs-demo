import React from 'react'

export default function Item(props) {
  return (
    <h3>
      {props.name} -{' '}
      <span>
        <a href="#" onClick={props.delete}>
          x
        </a>
      </span>
    </h3>
  )
}
