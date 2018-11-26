import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withTheme } from '@material-ui/core/styles'
import { BounceLoader } from 'react-spinners'
import classNames from 'classnames'

class Spinner extends Component {
  render () {
    let spinerClass = classNames(
      'spinner',
      {
        loading: this.props.isLoading
      })

    return (
      <div className={spinerClass}>
        <BounceLoader
          color={this.props.theme.palette.primary.main}
          loading={this.props.isLoading}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.request.isLoading
  }
}

export default connect(mapStateToProps, null)(withTheme()(Spinner))
