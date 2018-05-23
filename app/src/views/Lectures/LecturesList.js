import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import {
  fetchLectures
} from '../../actions'

class LecturesList extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount () {
    this.props.actions.fetchLectures()
  }

  render () {
    return (
      <div>
        <Grid container>
          Comming soon...
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    lectures: state.lectures
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({fetchLectures}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LecturesList)
