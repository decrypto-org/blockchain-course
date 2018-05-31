import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import cx from 'classnames'

export default function withList (ListComponent, key, actions, route) {
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
  })

  const mapStateToProps = state => ({
    [key]: state[key][key]
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
          return <ListComponent {...item} key={index} className={cx('item', key)} to={route + item.id} />
        })
      }
      return (
        <div>
          <Grid container>
            <List component='nav' className={cx('list', key)}>
              {items}
            </List>
          </Grid>
        </div>
      )
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(ListHOC)
}
