import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import cx from 'classnames'

const styles = theme => ({
  jumbotron: {
    fontSize: '100%'
  },
  button: {
    margin: theme.spacing.unit
  },
  buttonFirst: {
    marginLeft: 0
  }
})

class Home extends React.Component {
  render () {
    let buttons = []
    let { classes } = this.props

    buttons.push(
      <Button className={cx(classes.button, classes.buttonFirst)} classes={{ root: classes.jumbotron }} variant='contained' color='primary' to='/lecture' component={Link}>Begin the lectures</Button>
    )

    if (this.props.isAuthenticated) {
      buttons.push(
        <Button className={classes.button} variant='outlined' color='secondary' to='/assignment' component={Link}>Solve the puzzles</Button>
      )
    } else {
      buttons.push(
        <span>
          or <Button className={classes.button} classes={{ root: classes.jumbotron }} variant='outlined' color='secondary' size='large' to='/login' component={Link}>Login</Button> to solve the puzzles
        </span>
      )
    }
    return (
      <div>
        <h1 className='home-title'>An introductory course on blockchain science and engineering</h1>
        <div className='button-row' >
          {buttons}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(Home))
