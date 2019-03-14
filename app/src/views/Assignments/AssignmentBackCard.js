import React from 'react'
import Typography from '@material-ui/core/Typography'
import DoneIcon from '@material-ui/icons/Done'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const difficultyMapping = {
  0: 'Very easy',
  1: 'Easy',
  2: 'Medium',
  3: 'Hard'
}

const AssignmentBackCard = ({ solved, difficulty }) => {
  return <div>
    <Typography color='textSecondary'>
      {solved ? (
        <DoneIcon className='icon solved' />
      ) : (
        <HighlightOffIcon className='icon' />
      )}
    </Typography>
    <Typography color='textPrimary'>
      {difficultyMapping[difficulty]}
    </Typography>
  </div>
}

export default AssignmentBackCard
