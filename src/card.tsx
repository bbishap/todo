import React from 'react'
import { ListGroupItem } from 'reactstrap'

interface item {
  taskName: String,
  deleted: Boolean,
  deadline: Date,
  private: Boolean
}
interface Props {
  item: item
}

const Card: React.FC<Props> = (props) => {

  const item: item = props.item

  return (
    <div style={{ width: '100%' }}>
      <div>
        <ListGroupItem style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }} >
          <div>{item.taskName}</div>
          <div>{new Date(item.deadline).toDateString()} - {new Date(item.deadline).toLocaleTimeString()}</div>
        </ListGroupItem>
      </div>
    </div>
  )
}

export default Card