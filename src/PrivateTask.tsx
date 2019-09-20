import React, { useState, useEffect } from 'react';

import firebase from 'firebase';
import { Card, ListGroup } from 'reactstrap';
import db from './helper';
import ListCard from './card'

interface todoItem {
  taskName: String,
  deleted: Boolean,
  deadline: Date,
  private: Boolean
}

export const PrivateTask: React.FC = (props) => {

  const [task, setTask] = useState([] as todoItem[])

  const getAllPrivateData = () => {
    db.collection('todos').doc(firebase.auth().currentUser!.uid).get().then(res => {
      let data = res.data()!.tasks
      setTask(data)
    })
  }

  useEffect(() => {
    getAllPrivateData()
  }, [task])

  return (
    <div style={{ textAlign: 'center', margin: '30px auto', width: '60%' }}>
      <Card>
        <h2 style={{ height: '30px', margin: '30px 0' }}>Private Tasks</h2>
        <ListGroup style={{ margin: 'auto', width: '70%' }}>
          {task.map((item: todoItem, i: number) => {
            if (item.private === true && item.deleted === false) {
              return <ListCard item={item} key={i} />;
            }
          })}
        </ListGroup>
      </Card>
    </div >
  );
}

