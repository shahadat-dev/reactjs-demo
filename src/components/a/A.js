import React, { Component } from 'react'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import shortid from 'shortid'

class A extends Component {
  constructor () {
    super()
    this.data = {}
  }

  componentDidMount () {
    this.modal()
  }

  clickHandler (e) {
    e.preventDefault()
    this.modal()
  }

  modal () {
    var that = this
    const unik = shortid.generate()
    that.data[unik] = unik

    // Random Color
    function getRandomColor () {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }

    $('.add').click(function () {
      if (that.data[unik]) {
        $('#vbit').append(
          '<div class="test" style="background-color: ' +
            getRandomColor() +
            '" id="hello-' +
            that.data[unik] +
            '"><i class="closing' +
            that.data[unik] +
            '">X</i></div>'
        )
        $('#hello-' + that.data[unik]).show().draggable().resizable()

        $('.closing' + that.data[unik]).on('click', function () {
          $(this).parent().remove()
          delete that.data[unik]
        })
      }
    })
  }

  render () {
    return (
      <div className='row justify-content-center p-5'>
        <div className='col-sm-12 mb-10'>
          <a
            className='add btn btn-success'
            onClick={this.clickHandler.bind(this)}
            href='#'
          >
            Add Modal
          </a>

          <div id='vbit' />

        </div>
      </div>
    )
  }
}

export default A
