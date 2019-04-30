import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'

const SingleAssignment = ({ assignment, material, desc, solution, handleInputChange }) => {
  return (
    <CardContent>
      <Typography gutterBottom variant='headline' component='h2'>
        {assignment.title}
      </Typography>
      <Typography paragraph className='description'>
        {desc}
      </Typography>
      {material}
      <Typography gutterBottom variant='headline' component='h2'>
                    Solution
      </Typography>
      {assignment.type !== 2
        ? (
          <TextField
            id='solution'
            fullWidth
            value={solution}
            onChange={handleInputChange}
            margin='normal'
            name='solution'
          />
        ) : (
          <TextField
            id='solution'
            name='solution'
            fullWidth
            multiline
            rows='6'
            variant='outlined'
            placeholder='Paste your solidity code here'
            value={solution}
            onChange={handleInputChange}
            margin='normal'
          />
        )}
      <Input type='hidden' value={assignment.paramId} name='paramId' />
    </CardContent>
  )
}

export default SingleAssignment
