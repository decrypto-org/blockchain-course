import { Component } from 'react'
import { getSession } from '../../utils/AuthService'

class LoginCallback extends Component {
  constructor () {
    super()
  }

  componentDidMount () {
    window.location.href = '/'
  }

  render () {
    return null
  }
}

export default LoginCallback
