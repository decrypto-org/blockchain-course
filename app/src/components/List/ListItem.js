import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

export default function Footer ({ ...props }) {
  return (
    <ListItem button component={Link} to={props.to}>
      <ListItemText primary={props.title} secondary={props.description} />
    </ListItem>
  )
}
