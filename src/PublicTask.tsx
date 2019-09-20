import React, { useState, useEffect } from 'react';

import firebase from 'firebase';
import { Card, Button, ListGroupItem, ListGroup } from 'reactstrap';

import Switch from "react-switch";
import db from './helper'
import ListCard from './card'


interface todoItem {
  taskName: String,
  deleted: Boolean,
  deadline: Date,
  private: Boolean
}

export const PublicTask: React.FC = (props) => {

  const [task, setTask] = useState([] as todoItem[])

  const getAllData = async () => {
    let data = await db.collection('todos').get()
    let todo: todoItem[] = []
    data.forEach(doc => {
      const data = doc.data()!.tasks;
      data.forEach((element: todoItem) => {
        todo.push(element)
      });
    })
    setTask(todo)
  }

  useEffect(() => {

    getAllData()

  }, [task])

  return (
    <div style={{ textAlign: 'center', margin: '30px auto', width: '60%' }}>
      <Card>
        <h2 style={{ height: '30px', margin: '30px 0' }}>Public Tasks</h2>
        {/* {console.log('hey', task)} */}
        <ListGroup style={{ margin: 'auto', width: '70%' }}>
          {task.map((item: todoItem, i: number) => {
            if (item.private === false) {
              return (
                <ListCard item={item} key={i} />
              );
            }
          })}
        </ListGroup>
      </Card>
    </div >
  );
}


