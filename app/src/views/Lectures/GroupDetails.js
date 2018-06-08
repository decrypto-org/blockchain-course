import React from 'react'
import Item from '../../components/Item/Item'

export default class GroupDetails extends React.Component {
  render () {
    const item = {name: 'group', title: this.props.item.title, description: this.props.item.description}
    const contents = [
      {title: 'Lectures', list: [...this.props.item.lectures], to: '/lecture'},
      {title: 'Assignments', list: [...this.props.item.assignments], to: '/assignment'}
    ]

    return (
      <Item item={item} contents={contents} />
    )
  }
}
