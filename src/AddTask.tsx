import React, { useState, useEffect } from 'react';
import db from './helper'
import firebase from 'firebase'
import { Button, Input, Form } from 'reactstrap';


import Switch from "react-switch";

const openType: boolean = false;

interface todo {
  deadline: string,
  private: Boolean,
  taskName: String,
  deleted: Boolean
}

interface Props {
  refresh: any
}

export const AddTask: React.FC<Props> = (props) => {

  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [todo, setTodo] = useState([] as todo[])
  const [switchTask, setSwitchTask] = useState(openType);

  const onButtonClick: Function = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newTask = { taskName, deadline, private: switchTask, deleted: false }
    let uid = firebase.auth().currentUser!.uid

    db.collection('todos').doc(uid).get().then(querySnapshot => {
      console.log(querySnapshot.data())
      if (querySnapshot.data() !== undefined) {
        console.log('asd')
        const todo = querySnapshot.data()!.tasks
        let body = [...todo, newTask]
        db.collection('todos').doc(uid).set({ tasks: body })
        setTodo(todo => [...todo]);
      } else {
        db.collection('todos').doc(uid).set({ tasks: [newTask] })
        setTodo([newTask])
      }
    })

    props.refresh()


  }

  const onSwitchChange: Function = () => {
    console.log('Switch Changed')
    setSwitchTask(!switchTask)
  }
  const handleChange: Function = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'text') {
      var taskName = e.target.value;
      setTaskName(taskName)
    }
    if (e.target.name === 'deadline') {
      var deadline = e.target.value;
      setDeadline(deadline)
    }
    console.log('handled')
  }

  return (
    <div>
      <Form onSubmit={(e) => onButtonClick(e)}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }} >
          <div style={{ width: '53%', marginTop: '30px', marginLeft: '60px' }}>
            <Input onBlur={(e) => handleChange(e)} type="text" name="text" id="newTodo" placeholder="Add New Task Here ..." />
          </div>
          <div style={{ width: '10%', marginTop: '30px', marginLeft: '20px' }}>
            <Button type="submit" color="success" >Add Task </Button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ width: '11%', marginTop: '24px', marginLeft: '0px' }}>
            Deadline Of The Task :
          </div>
          <div style={{ marginTop: '32px', marginLeft: '5px', marginRight: '10px' }}>
            <Input type='datetime-local' onBlur={(e) => handleChange(e)} name='deadline' />
          </div>
          <div style={{ width: '12%', marginTop: '24px', marginLeft: '5px' }}>
            Is This Your Private Task ?
        </div>
          <div style={{ marginTop: '32px', marginLeft: '10px', marginRight: '10px' }}>
            <Switch onChange={(e) => onSwitchChange(e)} checked={switchTask} />
          </div>
        </div>
      </Form>
    </div >
  );
}