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

export default class AssignmentDetails extends React.Component {
  render () {
    const { classes } = this.props
    const assignment = this.props.item
    const solvedClass = cx('solved', { hidden: !assignment.solved })

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
                    {sprintf(assignment.description, [assignment.aux])}
                  </Typography>
                  <Typography gutterBottom variant='headline' component='h2'>
                    Solution
                  </Typography>
                  <TextField
                    id='solution'
                    fullWidth
                    value={this.props.solution}
                    onChange={this.props.handleInputChange}
                    margin='normal'
                    name='solution'
                  />
                  <Input type='hidden' value={assignment.paramId} name='paramId' />
                </CardContent>
                <CardActions className='assignment-actions'>
                  <Button type='submit' size='small'>Submit</Button>
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
