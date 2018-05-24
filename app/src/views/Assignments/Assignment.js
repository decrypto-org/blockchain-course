import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import {sprintf} from 'sprintf-js'

import {
  fetchSingleAssignment
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
    this.state = {}
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
    console.log(sprintf(assignment.description, [assignment.aux]))
    return (
      <div>
        <Grid container className='assignment-wrapper'>
          <article className='content-box-wrapper assignment'>
            <Card className={classes.card}>
              <CardContent>
                <Typography gutterBottom variant='headline' component='h2'>
                  {assignment.title}
                </Typography>
                <Typography paragraph>
                  {sprintf(assignment.description, [assignment.aux])}
                </Typography>
              </CardContent>
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
    actions: bindActionCreators({fetchSingleAssignment}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Assignment))
