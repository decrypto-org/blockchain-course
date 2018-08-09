import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { withStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

const styles = {}

function Content ({ ...props }) {
  const { title, list, to, toKey } = props
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
              <ListItem button component={Link} to={`${to}/${subItem[toKey]}`} key={index}>
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

export default withStyles(styles)(Content)
