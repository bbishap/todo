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
interface Props {
  data: string
}

export const PrivateTask: React.FC<Props> = (props) => {

  const [task, setTask] = useState([] as todoItem[])
  const [constData, setConstData] = useState([] as todoItem[])

  const getAllPrivateData = () => {
    db.collection('todos').doc(firebase.auth().currentUser!.uid).get().then(querySnapshot => {

      if (querySnapshot.data() !== undefined) {
        let data = querySnapshot.data()!.tasks
        setTask(data)
        setConstData(data)
      }
      else {
        db.collection('todos').doc(firebase.auth().currentUser!.uid).set({ tasks: [] })
      }

    })
  }

  const searchData = () => {
    const toSearch = props.data
    var allData = constData;
    let result: any = allData.filter(x => x.taskName.includes(toSearch));
    setTask(result)
  }

  useEffect(() => {
    getAllPrivateData()
  }, [])

  useEffect(() => {
    searchData()
  }, [props.data])

  const incomingData = (sorted: any) => {
    setTask(sorted)
    setConstData(sorted)
  }

  return (
    <div style={{ textAlign: 'center', margin: '30px auto', width: '60%' }}>
      <Card>
        <h2 style={{ height: '30px', margin: '30px 0' }}>Private Tasks</h2>
        <div style={{ marginLeft: '80%', marginBottom: '30px' }}>
          <Sorting data={task} incoming={(sorted: any) => incomingData(sorted)} />
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

