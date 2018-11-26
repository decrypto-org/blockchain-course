import React from 'react'
import Item from '../../components/Item/Item'
import ItemContent from '../../components/Item/Content'

export default class GroupDetails extends React.Component {
  render () {
    const item = { name: 'group', title: this.props.item.title, description: this.props.item.description }
    const contents = []

    if (this.props.item.lectures && this.props.item.lectures.length > 0) {
      contents.push({ title: 'Lectures', list: [...this.props.item.lectures], to: '/lecture', toKey: 'id', component: ItemContent })
    }
    console.log(this.props.item.assignments)
    if (this.props.item.assignments && this.props.item.assignments.length > 0) {
      contents.push({ title: 'Assignments', list: [...this.props.item.assignments], to: '/assignment', toKey: 'name', component: ItemContent })
    }

    return (
      <Item item={item} contents={contents} />
    )
  }
}
