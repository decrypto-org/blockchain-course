import React from 'react'
import Item from '../../components/Item/Item'
import FileContent from '../../components/Item/FileContent'

export default class LectureDetails extends React.Component {
  render () {
    const item = { name: 'lecture', title: this.props.item.title, description: this.props.item.description }
    const contents = [
      {
        title: 'Material',
        list: [...this.props.item.files],
        component: FileContent,
        dowloadFile: this.props.dowloadFile
      }
    ]
    return (
      <Item item={item} contents={contents} />
    )
  }
}
