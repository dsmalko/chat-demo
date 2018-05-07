import React from 'react'
import ReactDOM from 'react-dom'
import App from '../react/app.jsx'
import axios from 'axios'

// let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
// axios.defaults.headers.common['X-CSRF-Token'] = token
// axios.defaults.headers.common['Accept'] = 'application/json'

document.addEventListener('DOMContentLoaded', () => {
  const el = document.body.appendChild(document.createElement('div'))
  el.id = 'app'

  ReactDOM.render(
    <App/>,
    el,
  )
})
