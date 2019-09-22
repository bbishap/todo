import React, { useState, useEffect } from 'react';

import firebase from 'firebase';
import { Card, ListGroup } from 'reactstrap';
import db from './helper';
import ListCard from './card'
import Sorting from './Sorting';

interface todoItem {
  taskName: String,
  deleted: Boolean,
  deadline: Date,
  private: Boolean
}

export const PrivateTask: React.FC = (props) => {

  const [task, setTask] = useState([] as todoItem[])

  const getAllPrivateData = () => {
    db.collection('todos').doc(firebase.auth().currentUser!.uid).get().then(querySnapshot => {
      console.log(querySnapshot.data())
      // debugger;
      if (querySnapshot.data() !== undefined) {
        let data = querySnapshot.data()!.tasks
        setTask(data)
      }
      else {
        db.collection('todos').doc(firebase.auth().currentUser!.uid).set({ tasks: [] })
      }

    })
  }

  useEffect(() => {
    getAllPrivateData()
  }, [])

  const incomigData = (sorted: any) => {
    console.log(sorted)
    setTask(sorted)
  }
  return (
    <div style={{ textAlign: 'center', margin: '30px auto', width: '60%' }}>
      <Card>
        <h2 style={{ height: '30px', margin: '30px 0' }}>Private Tasks</h2>
        <div style={{ marginLeft: '80%', marginBottom: '30px' }}>
          <Sorting data={task} incoming={(sorted: any) => incomigData(sorted)} />
        </div>
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

