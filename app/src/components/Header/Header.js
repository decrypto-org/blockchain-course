import React from 'react'
import cx from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  appBar: {
    zIndex: 10000
  },
  headerTitle: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

function Header ({ ...props }) {
  const { classes } = props
  return (
    <AppBar position='absolute' className={classes.appBar}>
      <Toolbar>
        <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
          <MenuIcon />
        </IconButton>
        <Typography variant='title' color='inherit' className={cx(classes.headerTitle, 'header-link')}>
          <Link to='/'>Blockchain Cource</Link>
        </Typography>
        <Button color='inherit'>Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(Header)
