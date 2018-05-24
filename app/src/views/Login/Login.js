import React from 'react'
import { Redirect } from 'react-router'

export default class Login extends React.Component {
  render () {
    return (
      <Redirect to={process.env.REACT_APP_LOGIN_URL} />
    )
  }
}
