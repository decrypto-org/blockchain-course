import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import ItemHeader from './Header'
import ItemContent from './Content'

const styles = {}

function Item ({ ...props }) {
  const { contents, item } = props
  return (
    <Grid container spacing={16} direction='row' alignItems='flex-start' justify='flex-start' className={item.name}>
      <Grid item xs={12}>
        <ItemHeader {...item} />
      </Grid>
      {
        contents.map((content) => (
          <Grid item xs={12}>
            <ItemContent {...content} />
          </Grid>
        ))
      }
    </Grid>
  )
}

export default withStyles(styles)(Item)
