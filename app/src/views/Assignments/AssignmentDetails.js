import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Check from '@material-ui/icons/Check'
import cx from 'classnames'
import { sprintf } from 'sprintf-js'
import { withStyles } from '@material-ui/core/styles'

import FileIcon from '../../components/Item/FileIcon'

const styles = theme => ({
  materialButton: {
    '&:hover, &.hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  }
})

class AssignmentDetails extends React.Component {
  render () {
    const { classes } = this.props
    const assignment = this.props.item
    const solvedClass = cx('solved', { hidden: !assignment.solved })

    assignment.description = sprintf(assignment.description, [assignment.aux])
    let description = assignment.description.split('\n')
    let material

    if (assignment.files && assignment.files.length > 0) {
      material = <div className='assignment-material'>
        <Typography gutterBottom variant='headline' component='h2'>
            Material
        </Typography>
        {
          assignment.files.map((file, index) =>
            <Button onClick={() => this.props.dowloadFile(file.hash)} key={index} className={this.props.classes.materialButton}>
              <FileIcon type={file.fileType} />
              {`${file.title}.${file.fileType}`}
            </Button>
          )
        }
      </div>
    }

    return (
      <div>
        <Grid container className='assignment-wrapper'>
          <article className='content-box-wrapper assignment'>
            <Card className={classes.card}>
              <form className={classes.container} noValidate autoComplete='off' action='post' onSubmit={this.props.submitSolution}>
                <CardContent>
                  <Typography gutterBottom variant='headline' component='h2'>
                    {assignment.title}
                  </Typography>
                  <Typography paragraph>
                    {
                      description.map((el, index) => (
                        <span key={index}>
                          {el}
                          <br />
                        </span>
                      ))
                    }
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
                        value={this.props.solution}
                        onChange={this.props.handleInputChange}
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
                        value={this.props.solution}
                        onChange={this.props.handleInputChange}
                        margin='normal'
                      />
                    )}
                  <Input type='hidden' value={assignment.paramId} name='paramId' />
                </CardContent>
                <CardActions className='assignment-actions'>
                  <Button type='submit' size='small' variant='outlined' color='secondary'>Submit</Button>
                  <div className={solvedClass}><Check /></div>
                </CardActions>
              </form>
            </Card>
          </article>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(AssignmentDetails)
