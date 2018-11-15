import React from 'react'
import PictureAsPdf from '@material-ui/icons/PictureAsPdf'
import InsertDriveFile from '@material-ui/icons/InsertDriveFile'

const icons = {
  pdf: PictureAsPdf,
  default: InsertDriveFile
}

function FileIcon ({ ...props }) {
  const { type } = props
  const iconKey = icons.hasOwnProperty(type) ? type : 'default'
  const Icon = icons[iconKey]
  return (
    <Icon />
  )
}

export default FileIcon
