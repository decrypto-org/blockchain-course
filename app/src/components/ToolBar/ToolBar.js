import React from 'react'
import egg from '../../assets/images/egg-green.png'

function Toolbar ({ ...props }) {
  return (
    <div className='toolbar'>
      <div className='egg'>
        <img src={egg} alt='egg' />
        <span>7</span>
      </div>
    </div>
  )
}

export default Toolbar
