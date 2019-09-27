import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Spinner,
  Input
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
  const [showPrivateTask, setShowPrivateTask] = useState(boolType);
  const [showPublicTask, setShowPublicTask] = useState(boolType);
  const [showMyTask, setShowMyTask] = useState(true)
  const [task, setTask] = useState([] as todo[]);
  const [searchData, setSearchData] = useState('')

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

  const handleSearch = (e: any) => {
    let searching = e.target.value
    setSearchData(searching);
  }

  useEffect(() => {

    getAllData()

  }, [])

  return (

    <div>
      <Navbar color="dark" light expand="md">
        <NavbarBrand href="/" style={{ color: 'white' }}>TODO</NavbarBrand>
        <div style={{ marginLeft: '216px', width: '40%' }}>
          {showMyTask ? null : <Input type='text' placeholder='Search Task Here ...' onChange={(e: any) => handleSearch(e)} />}
        </div>
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
              My Tasks
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
      <div>{showMyTask ? <AddTask refresh={getAllData} /> : null} </div>
      {task ?
        showPrivateTask ? (
          <div><PrivateTask data={searchData} /></div>
        ) : showPublicTask ? (
          <div><PublicTask data={searchData} /></div>
        ) : showMyTask ? (
          <div><MyTask /> </div>
        ) : <MyTask />
        : <Spinner color='secondary' style={{ marginLeft: '50%', marginTop: '30px' }} />
      }
    </div>
  );
}
