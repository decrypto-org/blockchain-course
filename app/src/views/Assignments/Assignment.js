/* global FormData */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Check from '@material-ui/icons/Check'
import cx from 'classnames'

import {sprintf} from 'sprintf-js'

import {
  fetchSingleAssignment,
  submitSolution,
  notify
} from '../../actions'

const styles = {
  card: {
    width: 800
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
}

class Assignment extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      solution: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.submitSolution = this.submitSolution.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  submitSolution (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    let objData = {}

    data.forEach(function (value, key) {
      objData[key] = value
    })

    objData.paramId = this.props.assignment[0].paramId
    this.props.actions.submitSolution(this.props.match.params.id, objData)
      .then((value) => {
        const msg = value.grade === 0 ? 'Wrong! Please try again.' : 'Congratulations! You found the solution'
        this.props.actions.notify(msg)
      })
  }

  componentDidMount () {
    this.props.actions.fetchSingleAssignment(this.props.match.params.id)
  }

  render () {
    if (typeof this.props.assignment === 'undefined' || this.props.assignment.length === 0) {
      return null
    }

    const { classes } = this.props
    const assignment = this.props.assignment[0]
    const solvedClass = cx('solved', {hidden: !assignment.solved})

    return (
      <div>
        <Grid container className='assignment-wrapper'>
          <article className='content-box-wrapper assignment'>
            <Card className={classes.card}>
              <form className={classes.container} noValidate autoComplete='off' action='post' onSubmit={this.submitSolution}>
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
                    value={this.state.solution}
                    onChange={this.handleInputChange}
                    margin='normal'
                    name='solution'
                  />
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

const mapStateToProps = (state, ownProps) => {
  return {
    assignment: state.singleAssignment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({fetchSingleAssignment, submitSolution, notify}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Assignment))
