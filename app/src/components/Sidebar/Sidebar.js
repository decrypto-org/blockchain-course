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
    '&:focus, &.active': {
      backgroundColor: theme.palette.primary.main,
      '& $textItem, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  textItem: {},
  icon: {}
})

function Sidebar ({ ...props }) {
  const { classes, routes } = props
  // verifies if routeName is the one active (in browser input)
  function activeRoute (routeName) {
    return props.location.pathname.indexOf(routeName) > -1
  }

  const menu = (
    <MenuList className='main-menu'>
      {routes.map((prop, key) => {
        const menuItemClasses = cx({
          [classes.menuItem]: classes.menuItem,
          'active': activeRoute(prop.path)
        })

        return (
          <NavLink
            to={prop.path}
            activeClassName='active'
            key={key}
          >
            <MenuItem button className={menuItemClasses}>
              <ListItemIcon className={classes.icon}>
                <prop.icon />
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                className={classes.textItem}
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
