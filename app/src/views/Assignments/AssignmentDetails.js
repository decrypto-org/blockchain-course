import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Check from '@material-ui/icons/Check'
import cx from 'classnames'
import { sprintf } from 'sprintf-js'
import { withStyles } from '@material-ui/core/styles'

import SingleAssignment from './SingleAssignment'
import FileIcon from '../../components/Item/FileIcon'

const styles = theme => ({
  materialButton: {
    '&:hover, &.hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  author: {
    color: theme.palette.secondary.light
  },
  root: {
    maxWidth: '100%'
  },
  card: {
    width: '100%'
  }
})

class AssignmentDetails extends React.Component {
  formatAuthors (authors) {
    if (authors && authors.length > 0) {
      if (authors.length === 1) {
        return `Created by ${authors[0]}`
      }

      const last = authors.pop()
      return `Created by ${authors.join(', ')}${authors.length === 1 ? '' : ','} and ${last}`
    }

    return null
  }

  getMaterial (assignment) {
    if (assignment.files && assignment.files.length > 0) {
      return <div className='assignment-material'>
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

    return null
  }

  getDescription (assignment) {
    const aux = assignment.aux ? assignment.aux : ''

    assignment.description = sprintf(assignment.description, ...aux.split(','))
    let description = assignment.description.split('\n')

    return description.map((el, index) => (
      <span key={index}>
        {el}
        <br />
      </span>
    ))
  }

  render () {
    const { classes } = this.props
    const assignment = this.props.item
    console.log(assignment)
    const solvedClass = cx('solved', { hidden: !assignment.solved })
    classes.solvedClass = solvedClass

    return (
      <div>
        <Grid container className='assignment-wrapper'>
          <article className='content-box-wrapper assignment'>
            <Card className={`${classes.root} ${classes.card}`}>
              <form className={classes.container} noValidate autoComplete='off' action='post' onSubmit={this.props.submitSolution}>
                <SingleAssignment
                  assignment={assignment}
                  material={this.getMaterial(assignment)}
                  desc={this.getDescription(assignment)}
                  solution={this.props.solution}
                  handleInputChange={this.props.handleInputChange}
                />
                <CardActions className='assignment-actions'>
                  <Button type='submit' size='small' variant='outlined' color='secondary'>Submit</Button>
                  <div className={solvedClass}><Check /></div>
                </CardActions>
              </form>
            </Card>
            <span className={`author ${classes.author}`}>{this.formatAuthors(assignment.authors)}</span>
          </article>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(AssignmentDetails)
