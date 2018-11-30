import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'

function Header ({ ...props }) {
  const { Avatar, ToolBar } = props
  return (
    <header className='header container-fluid'>
      <div className='row'>
        <div className='col-6'>
          <ToolBar />
        </div>
        <div className='col-6'>
          <Avatar />
        </div>
      </div>
    </header>
  )
}

export default Header
