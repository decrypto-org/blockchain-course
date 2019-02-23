import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

export default function CardListItem ({ ...props }) {
  return (
    <article className='flip-container list-item'>
      <Link to={props.to}>
        <div className='flipper'>
          <div className='front'>
            <Card className='content'>
              <CardContent>
                <props.Front {...props} />
              </CardContent>
            </Card>
          </div>
          <div className='back'>
            <Card className='content'>
              <CardContent>
                <props.Back {...props} />
              </CardContent>
            </Card>
          </div>
        </div>
      </Link>
    </article>
  )
}
