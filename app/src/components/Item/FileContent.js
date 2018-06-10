import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { withStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import FileIcon from './FileIcon'

const styles = {}

function FileContent ({ ...props }) {
  const {title, list} = props
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
              <ListItem button onClick={() => props.onClick(subItem.hash)} key={index}>
                <ListItemIcon>
                  <FileIcon type={subItem.fileType} />
                </ListItemIcon>
                <ListItemText
                  primary={subItem.title}
                  secondary={subItem.description}
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
