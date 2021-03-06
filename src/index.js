import React from 'react'
import ReactDOM from 'react-dom'

import $ from 'jquery'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
// import './assets/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import 'jquery-ui-dist/jquery-ui.css'

import App from './App'
import * as serviceWorker from './serviceWorker'

window.jQuery = window.$ = $

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
