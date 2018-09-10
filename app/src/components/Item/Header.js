import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { withStyles } from '@material-ui/core/styles'

const styles = {}

function ItemHeader ({ ...props }) {
  const { title, description } = props
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={description}
        className='item-header'
      />
    </Card>
  )
}

export default withStyles(styles)(ItemHeader)
