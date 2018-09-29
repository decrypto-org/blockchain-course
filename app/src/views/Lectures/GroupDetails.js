import React from 'react'
import Item from '../../components/Item/Item'
import ItemContent from '../../components/Item/Content'

export default class GroupDetails extends React.Component {
  render () {
    const item = { name: 'group', title: this.props.item.title, description: this.props.item.description }
    const contents = [
      { title: 'Lectures', list: [...this.props.item.lectures], to: '/lecture', toKey: 'id', component: ItemContent },
      { title: 'Assignments', list: [...this.props.item.assignments], to: '/assignment', toKey: 'name', component: ItemContent }
    ]

    return (
      <Item item={item} contents={contents} />
    )
  }
}
