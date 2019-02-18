import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import cx from 'classnames'

export default function withList (ListComponent, key, actions, route, routeKey = 'id') {
  const mapStateToProps = state => ({
    [key]: state[key]
  })

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }, dispatch)
  })

  class ListHOC extends React.Component {
    componentDidMount () {
      this.props.actions.getList().catch(e => console.log(e))
    }

    render () {
      if (!this.props[key]) {
        return null
      }

      let items = ''
      if (this.props[key] && this.props[key].length > 0) {
        items = this.props[key].map((item, index) => {
          return <ListComponent {...item} key={index} to={route + item[routeKey]} Back={this.props.Back} Front={this.props.Front} />
        })
      }
      return (
        <div>
          <Grid container>
            <List component='section' className={cx('list', key)}>
              {items}
            </List>
          </Grid>
        </div>
      )
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(ListHOC)
}
