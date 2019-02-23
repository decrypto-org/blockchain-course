import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'

import {
  closeToast,
  notify
} from '../../actions'

const styles = {}

class Messenger extends Component {
  linesToParagraphs (...nodes) {
    return nodes
      .map(node => typeof node === 'string' ? node.split('\n').map(text => <p className='toast-message'>{text}</p>) : node)
      .reduce((nodes, node) => nodes.concat(node), [])
  }
  render () {
    return (
      <Snackbar
        open={this.props.notification.open}
        onClose={this.props.actions.closeToast}
        message={this.linesToParagraphs(this.props.notification.message)}
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            onClick={this.props.actions.closeToast}
          >
            <Close />
          </IconButton>
        ]}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    notification: state.notification,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ closeToast, notify }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Messenger))
