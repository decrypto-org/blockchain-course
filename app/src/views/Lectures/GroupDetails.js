import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'

export default class GroupDetails extends React.Component {
  render () {
    return (
      <Grid container spacing={16} direction='row' alignItems='flex-start' justify='flex-start' className='group'>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={this.props.item.title}
              subheader={this.props.item.description}
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
                  this.props.item.lectures.map((lecture) => (
                    <ListItem button component={Link} to={'/lecture/' + lecture.id}>
                      <ListItemText
                        primary={lecture.title}
                        secondary={lecture.description}
                      />
                    </ListItem>
                  ))
                }
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}
