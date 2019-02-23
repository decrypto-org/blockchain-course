import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { withStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import cx from 'classnames'

import FileIcon from './FileIcon'

const styles = theme => ({
  listItem: {
    '&:hover, &.hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
        '& $textItem, & $icon': {
          color: theme.palette.primary.contrastText,
        }
    }
  },
  textItem: {},
  icon: {}
})

function FileContent ({ ...props }) {
  const { title, list, classes } = props
  return (
    <Card>
      <CardHeader
        title={title}
        className='item-content'
      />
      <CardContent>
        <List dense>
          {
            list.map((subItem, index) => (
              <ListItem className={classes.listItem} button onClick={() => props.dowloadFile(subItem.hash)} key={index}>
                <ListItemIcon
                  className={classes.icon}
                >
                  <FileIcon type={subItem.fileType} />
                </ListItemIcon>
                <ListItemText
                  primary={subItem.title}
                  secondary={subItem.description}
                  className={classes.textItem}
                  classes={{primary: classes.textItem, secondary: classes.textItem}}
                />
              </ListItem>
            ))
          }
        </List>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(FileContent)
