import React, { useState, useEffect } from 'react';


import firebase from 'firebase';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Spinner
} from 'reactstrap';
import db from './helper'

import { PrivateTask } from './PrivateTask';
import { PublicTask } from './PublicTask';
import { MyTask } from './MyTask';
import { AddTask } from './AddTask';

const boolType: boolean = false;

interface todo {
  deadline: string,
  private: Boolean,
  taskName: String,
  deleted: Boolean
}

interface Props {
  userName: string,
  photo: string
}


export const Dashboard: React.FC<Props> = (props) => {
  // const [isOpen, setIsOpen] = useState(openType);
  const [showPrivateTask, setShowPrivateTask] = useState(boolType);
  const [showPublicTask, setShowPublicTask] = useState(boolType);
  const [showMyTask, setShowMyTask] = useState(boolType)
  const [task, setTask] = useState([] as todo[]);


  const handleClickPrivate: Function = () => {
    setShowPrivateTask(true)
    setShowMyTask(false)
    setShowPublicTask(false)

  }

  const handleClickPublic: Function = () => {
    setShowPrivateTask(false)
    setShowMyTask(false)
    setShowPublicTask(true)

  }

  const handleClickMyTask: Function = () => {
    setShowMyTask(true)
    setShowPrivateTask(false)
    setShowPublicTask(false)
  }

  const getAllData = async () => {
    let data = await db.collection('todos').get()
    let todo: todo[] = []
    data.forEach(doc => {
      const data = doc.data()!.tasks;
      data.forEach((element: todo) => {
        todo.push(element)
      });
    })
    setTask(todo)
  }

  useEffect(() => {

    getAllData()

  }, [])

  return (

    <div >
      <Navbar color="dark" light expand="md">
        <NavbarBrand href="/" style={{ color: 'white' }}>TODO</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button color='primary' style={{ marginRight: '10px', color: 'white', textAlign: 'center' }} onClick={() => handleClickPublic()}>
              Public Tasks
              </Button>
          </NavItem>
          <NavItem>
            <Button color='primary' style={{ marginRight: '10px', color: 'white', textAlign: 'center' }} onClick={() => handleClickPrivate()}>
              Private Tasks
              </Button>
          </NavItem>
          <NavItem>
            <Button color='primary' style={{ marginRight: '10px', color: 'white', textAlign: 'center' }} onClick={() => handleClickMyTask()}>
              My All Tasks
              </Button>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret style={{ color: 'white' }}>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <img src={props.photo} alt={props.userName} style={{ width: '40px', marginLeft: '50px' }} />
              </DropdownItem>
              <DropdownItem style={{ textAlign: 'center' }}>
                {props.userName}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <Button onClick={() => firebase.auth().signOut()} style={{ width: '150px', border: '0px' }}>Sign Out</Button>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
      <div> <AddTask refresh={getAllData} /> </div>
      {task ?
        showPrivateTask ? (
          <div><PrivateTask /></div>
        ) : showPublicTask ? (
          <div><PublicTask /></div>
        ) : showMyTask ? (
          <div><MyTask /> </div>
        ) : <MyTask />
        : <Spinner color='secondary' style={{ marginLeft: '50%', marginTop: '30px' }} />
      }
    </div>
  );
}
