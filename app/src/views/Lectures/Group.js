import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import {
  lectureGroupsActions
} from '../../actions'

const fetchSingleLectureGroup = lectureGroupsActions.fetchSingleLectureGroup

class LecturesList extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount () {
    this.props.actions.fetchSingleLectureGroup(this.props.match.params.id)
  }

  render () {
    if (!this.props.group || !this.props.group.length > 0) {
      return null
    }

    return (
      <div>
        <Grid container spacing={16} direction='row' alignItems='flex-start' justify='flex-start' className='group'>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={this.props.group[0].title}
                subheader={this.props.group[0].description}
                className='group-header'
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title='Lectures'
                className='group-lectures'
              />
              <CardContent>
                <List dense>
                  {
                    this.props.group[0].lectures.map((item) => (
                      <ListItem button>
                        <ListItemText
                          primary={item.title}
                          secondary={item.description}
                        />
                      </ListItem>
                    ))
                  }
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    group: state.group
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({fetchSingleLectureGroup}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LecturesList)
