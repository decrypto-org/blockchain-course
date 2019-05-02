import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const styles = theme => ({
  cell: {
    minWidth: 25,
    maxWidth: 500,
    wordWrap: 'break-word'
  }
})

const SolutionsTable = ({ rows, labels, classes }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {labels.map(label => (
            <TableCell className={classes.cell}>{label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell className={classes.cell}>{row.name}</TableCell>
            <TableCell className={classes.cell}><code>{row.solution}</code></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default withStyles(styles)(SolutionsTable)
