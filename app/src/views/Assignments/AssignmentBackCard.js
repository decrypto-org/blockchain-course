import React from 'react'
import Typography from '@material-ui/core/Typography'
import DoneIcon from '@material-ui/icons/Done'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const AssignmentBackCard = ({ solved }) => {
  return <Typography color='textSecondary'>
    {solved ? (
      <DoneIcon className='icon solved' />
    ) : (
      <HighlightOffIcon className='icon' />
    )}
  </Typography>
}

export default AssignmentBackCard
