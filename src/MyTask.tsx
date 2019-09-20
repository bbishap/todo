import React, { useState, useEffect } from 'react';

import firebase from 'firebase';
import { Card, ListGroup, ListGroupItem, Button, Input, Form, Row } from 'reactstrap';
import db from './helper';


interface todoItem {
  taskName: string,
  deleted: Boolean,
  deadline: string,
  private: Boolean
}
const boolType: boolean = false
const strType: string = ''

export const MyTask: React.FC = (props) => {

  const [task, setTask] = useState([] as todoItem[])
  const [showEdit, setShowEdit] = useState(boolType)
  const [editText, setEditText] = useState('')
  const [editTime, setEditTime] = useState(strType)
  const [index, setIndex] = useState()
  const [oldTask, setOldTask] = useState(strType)
  const [oldDate, setOldDate] = useState(strType)

  const getAllPrivateData = () => {
    db.collection('todos').doc(firebase.auth().currentUser!.uid).get().then(res => {
      let data = res.data()!.tasks
      setTask(data)
    })
  }

  const handleDelete = (i: any) => {
    db.collection('todos').doc(firebase.auth().currentUser!.uid).get().then(res => {
      let data = res.data()!.tasks
      data[i].deleted = true
      setTask(data)
      db.collection('todos').doc(firebase.auth().currentUser!.uid).set({ tasks: data })
    })
  }

  const handleEdit = (i: any) => {
    setShowEdit(!showEdit)
    setIndex(i)
    let state = task;
    const oldTodo: string = state[i].taskName
    const oldTime: string = state[i].deadline
    setOldTask(oldTodo)
    setOldDate(oldTime)
  }
  const handleEditSubmit = (e: any) => {
    e.preventDefault()
    let state = task;
    state[index].taskName = editText;
    state[index].deadline = editTime;
    setTask(state)
    db.collection('todos').doc(firebase.auth().currentUser!.uid).set({ tasks: task })
    setShowEdit(false)
  }

  const handleInput = (e: any) => {
    if (e.target.className === 'text') {
      const text = e.target.value
      setEditText(text)
    }
    if (e.target.className === 'date') {
      const time = e.target.value
      setOldDate(time)
      setEditTime(time)
    }

  }
  useEffect(() => {
    getAllPrivateData()
  }, [task])

  return (
    <div>
      {showEdit ?
        <div style={{ justifyContent: 'center' }}>
          <Card style={{ marginTop: '40px', width: '80%', marginLeft: '10%', justifyContent: 'center' }}>
            <ListGroup style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', width: '100%' }}>
              <Form onSubmit={(e) => handleEditSubmit(e)} style={{ marginLeft: '5%' }}>
                <div style={{ marginBottom: '20px' }}>
                  <Row>
                    <div style={{ marginTop: '5px' }}>  Task Name:</div>
                    <Input type='text' onChange={e => handleInput(e)} className='task' placeholder={oldTask} style={{ width: '40%', marginLeft: '10px', marginRight: '10px' }} />
                    <div style={{ marginTop: '5px' }}>  Date:</div>
                    <Input type='datetime-local' defaultValue={oldDate} onChange={e => handleInput(e)} className='date' style={{ width: '25%', marginLeft: '10px', marginRight: '10px' }} />
                    <Button type='submit' color='success' style={{ marginLeft: '8%' }}>Submit</Button>
                  </Row>
                </div>
              </Form>
            </ListGroup>
          </Card>
        </div> :
        <div style={{ textAlign: 'center', margin: '30px auto', width: '60%' }}>
          <Card>
            <h2 style={{ height: '30px', margin: '30px 0' }}>My Tasks</h2>
            <ListGroup style={{ margin: 'auto', width: '70%' }}>
              {task.map((item: todoItem, i: number) => {
                if (item.deleted === false) {
                  return (
                    <div style={{ width: '100%' }}>
                      <div>
                        <ListGroupItem style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }} >
                          <div><b>{item.taskName}</b></div>
                          <div>{new Date(item.deadline).toDateString()} - {new Date(item.deadline).toLocaleTimeString()}</div>
                          <div></div>
                          <div>
                            <Button color="info" onClick={() => handleEdit(i)} style={{ marginRight: '5px' }}>Edit</Button>

                            <Button color="danger" onClick={() => handleDelete(i)}>Delete</Button>
                          </div>
                        </ListGroupItem>
                      </div>
                    </div>
                  )
                }
              })}
            </ListGroup>
          </Card>
        </div >
      }
    </div>
  );
}

