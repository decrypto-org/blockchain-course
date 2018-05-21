import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import cx from 'classnames'

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: 240,
    paddingTop: 64
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {}
})

function Sidebar ({ ...props }) {
  const { classes, routes } = props
  const menu = (
    <MenuList className='main-menu'>
      {routes.map((prop, key) => {
        return (
          <NavLink
            to={prop.path}
            activeClassName='active'
            key={key}
          >
            <MenuItem button className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <prop.icon />
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                classes={{ primary: classes.primary }}
                disableTypography
              />
            </MenuItem>
          </NavLink>
        )
      })}
    </MenuList>
  )

  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: classes.drawerPaper
      }}
    >
      {menu}
    </Drawer>
  )
}

export default withStyles(styles)(Sidebar)
