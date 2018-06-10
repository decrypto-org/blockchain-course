import React from 'react'
import Item from '../../components/Item/Item'

export default class LectureDetails extends React.Component {
  render () {
    const item = {name: 'lecture', title: this.props.item.title, description: this.props.item.description}
    const contents = [
      {title: 'Material', list: [...this.props.item.files], to: '/file'}
    ]
    return (
      <Item item={item} contents={contents} />
    )
  }
}
