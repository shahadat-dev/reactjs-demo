import React from 'react'

export default function Item(props) {
  return (
    <h3>
      {props.name} - <span onClick={props.delete}>x</span>
    </h3>
  )
}
