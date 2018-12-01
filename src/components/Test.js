import React, { Component } from 'react'

import Item from './Item'

class Test extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      nameArr: []
    }
    this.deleteHandler.bind(this)
  }

  changeHandler(event) {
    console.log(event.target.value)
    this.setState({ name: event.target.value })
  }

  submitHandler(event) {
    event.preventDefault()
    if (!this.state.name) return

    let arr = [...this.state.nameArr]
    arr.push(this.state.name)

    this.setState({ nameArr: arr, name: '' })
  }

  deleteHandler(name) {
    let arr = [...this.state.nameArr]
    for (var i = 0; i <= arr.length - 1; i++) {
      if (arr[i] === name) {
        arr.splice(i, 1)
      }
    }

    this.setState({ nameArr: arr })
  }

  render() {
    console.log(this.state.nameArr)
    return (
      <div>
        <h2>Test</h2>
        <form onSubmit={this.submitHandler.bind(this)}>
          <input
            onChange={this.changeHandler.bind(this)}
            type="text"
            name="name"
            value={this.state.name}
          />
          <button type="submit">Add</button>
        </form>
        {this.state.nameArr.map(item => (
          <Item name={item} delete={() => this.deleteHandler(item)} />
        ))}
      </div>
    )
  }
}

export default Test
