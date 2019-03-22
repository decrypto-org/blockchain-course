import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Hidden from '@material-ui/core/Hidden'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

import cx from 'classnames'

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: 240,
    paddingTop: 64,
    backgroundColor: '#e8e8e8',
    border: 0,
    [theme.breakpoints.down('md')]: {
      paddingTop: 5
    }
  },
  menuItem: {
    '&:focus, &.active': {
      backgroundColor: theme.palette.secondary.light,
      '& $textItem, & $icon': {
        color: theme.palette.secondary.contrastText
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
      {routes.filter((item) => item.show).map((prop, key) => {
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
    <div>
      <Hidden mdUp implementation='css'>
        <Drawer
          variant='temporary'
          classes={{
            paper: classes.drawerPaper
          }}
          open={props.mobileDrawerOpen}
          onClose={props.closeMobileDrawer}
        >
          <div className='closeBtn'>
            <IconButton ccolor='inherit' aria-label='Close' onClick={props.closeMobileDrawer}>
              <CloseIcon />
            </IconButton>
          </div>
          <div
            tabIndex={0}
            role='button'
            onClick={props.closeMobileDrawer}
            onKeyDown={props.closeMobileDrawer}
          >
            {menu}
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation='css'>
        <Drawer
          variant='permanent'
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {menu}
        </Drawer>
      </Hidden>
    </div>
  )
}

export default withStyles(styles)(Sidebar)
