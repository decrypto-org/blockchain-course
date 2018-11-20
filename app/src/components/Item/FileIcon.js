import React from 'react'
import PictureAsPdf from '@material-ui/icons/PictureAsPdf'
import Code from '@material-ui/icons/Code'
import InsertDriveFile from '@material-ui/icons/InsertDriveFile'

const icons = {
  pdf: PictureAsPdf,
  sol: Code,
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
