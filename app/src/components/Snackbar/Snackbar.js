import React from 'react'
import { withStyles, Snackbar as Snack, IconButton } from '@material-ui/core/'
import Close from '@material-ui/icons/Close'
import cx from 'classnames'

const snackbarContentStyle = {
  root: {
    position: 'relative',
    padding: '20px 15px',
    lineHeight: '20px',
    marginBottom: '20px',
    fontSize: '14px',
    backgroundColor: 'white',
    color: '#555555',
    borderRadius: '3px',
    boxShadow:
      '0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2)'
  },
  iconButton: {
    width: '24px',
    height: '24px'
  },
  close: {
    width: '14px',
    height: '14px'
  },
  icon: {
    display: 'block',
    left: '15px',
    position: 'absolute',
    top: '50%',
    marginTop: '-15px',
    width: '30px',
    height: '30px'
  },
  message: {
    padding: '0',
    display: 'block',
    maxWidth: '89%'
  }
}

function Snackbar ({ ...props }) {
  const { classes, message, color, close, icon, place, open } = props
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
        onClick={() => props.closeNotification()}
      >
        <Close className={classes.close} />
      </IconButton>
    ]
  }
  return (
    <Snack
      anchorOrigin={{
        vertical: place.indexOf('t') === -1 ? 'bottom' : 'top',
        horizontal:
          place.indexOf('l') !== -1
            ? 'left'
            : place.indexOf('c') !== -1 ? 'center' : 'right'
      }}
      open={open}
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      SnackbarContentProps={{
        classes: {
          root: classes.root + ' ' + classes[color],
          message: classes.message
        }
      }}
    />
  )
}

export default withStyles(snackbarContentStyle)(Snackbar)
