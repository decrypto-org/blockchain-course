import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import ItemHeader from './Header'

const styles = {}

function Item ({ ...props }) {
  const { contents, item } = props
  return (
    <Grid container spacing={16} direction='row' alignItems='flex-start' justify='flex-start' className={item.name}>
      <Grid item xs={12}>
        <ItemHeader {...item} />
      </Grid>
      {
        contents.map((content, index) => {
          const { component: Component, ...rest } = content
          return (
            <Grid item xs={12} key={index}>
              <Component {...rest} />
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default withStyles(styles)(Item)
