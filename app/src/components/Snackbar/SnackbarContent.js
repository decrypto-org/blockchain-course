import React from 'react'
import { withStyles, SnackbarContent as Snack, IconButton } from 'material-ui'
import { Close } from 'material-ui-icons'
import cx from 'classnames'

import snackbarContentStyle from 'variables/styles/snackbarContentStyle.jsx'

function SnackbarContent ({ ...props }) {
  const { classes, message, color, close, icon } = props
  var action = []
  const messageClasses = cx({
    [classes.iconMessage]: icon !== undefined
  })
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key='close'
        aria-label='Close'
        color='inherit'
      >
        <Close className={classes.close} />
      </IconButton>
    ]
  }
  return (
    <Snack
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      classes={{
        root: classes.root + ' ' + classes[color],
        message: classes.message
      }}
      action={action}
    />
  )
}

export default withStyles(snackbarContentStyle)(SnackbarContent)
