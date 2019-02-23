import React from 'react'

const Ring = ({ radius, stroke, progress }) => {
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI

  const strokeDashoffset = circumference - progress / 100 * circumference

  return (
    <div className='progress-ring'>
      <svg
        height={radius * 2}
        width={radius * 2}
      >
        <g id='UrTavla'>
          <circle
            stroke='#000'
            fill='transparent'
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <text x='50%' y='50%' textAnchor='middle' stroke='#000' strokeWidth='0px' dy='.3em'>{progress}%</text>
        </g>
      </svg>
    </div>
  )
}
export default Ring
