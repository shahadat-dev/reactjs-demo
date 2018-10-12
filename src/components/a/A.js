import React, { Component } from 'react'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'

class A extends Component {
  // componentDidMount () {
  //   this.modal()
  // }

  clickHandler (e) {
    e.preventDefault()
    this.modal()
  }

  modal () {
    $(document).ready(function () {
      var count = 0
      $('.click').on('click', function () {
        count++
        $('#modal').append(
          '<div class="modal" id="modal' +
            count +
            '"><i class="current' +
            count +
            '">X</i><h2 class="text-center">' +
            count +
            '</h2></div>'
        )
        $('#modal' + count).show()
        $('#modal' + count).draggable().resizable()

        $('.current' + count).on('click', function () {
          $(this).parent().hide()
        })
      })
    })
  }
  render () {
    console.log(this.state)
    return (
      <div className='row justify-content-center p-5'>
        <div className='col-sm-12 mb-10'>
          <a
            className='click btn btn-success'
            onClick={this.clickHandler.bind(this)}
            href='#'
          >
            Add Modal
          </a>

          <div id='modal' />

        </div>
      </div>
    )
  }
}

export default A
