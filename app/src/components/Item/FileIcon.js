import React from 'react'
import PictureAsPdf from '@material-ui/icons/PictureAsPdf'
import InsertDriveFile from '@material-ui/icons/InsertDriveFile'

const icons = {
  pdf: PictureAsPdf,
  default: InsertDriveFile
}

function FileIcon ({ ...props }) {
  const {type} = props
  const Icon = icons[type || 'default']
  return (
    <Icon />
  )
}

export default FileIcon
