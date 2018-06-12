import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

export default function withSingleItem (Component, key, actions, route, styles = {}) {
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
  })

  const mapStateToProps = state => ({
    [key]: state[key]
  })

  class SingleItemHOC extends React.Component {
    componentDidMount () {
      this.props.actions.getItem(this.props.id).catch(e => console.log(e))
    }

    render () {
      if (!this.props[key] || !this.props[key].length > 0) {
        return null
      }

      return (
        <Component item={this.props[key][0]} {...this.props} />
      )
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SingleItemHOC))
}
