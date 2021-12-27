import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Table, Navbar, FormControl, InputGroup, Container } from 'react-bootstrap';
import logo from './logo.svg';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { v4 as uuid } from 'uuid';

function App() {
  const { register, handleSubmit, resetField, formState: { errors } } = useForm();
  const [showAddModal, setShowAddModal] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const todoForm = (data) => {
    todoList.push({ id: uuid(), todo: data.todo, priority: data.priority, status: false });
    setTodoList(todoList);
    setShowAddModal(false);
    resetField('todo');
    resetField('priority');
  }

  const PriorityTexts = {
    0: 'Low',
    1: 'Medium',
    2: 'High',
  }

  const changeStatus = (id, status) => {
    const newTodoList = todoList.map((todo) => (todo.id === id ? { ...todo, status: !status } : todo));
    setTodoList(newTodoList);
  }

  const clearAllDone = () => {
    const newTodoList = todoList.filter((todo) => { return !todo.status; });
    setTodoList(newTodoList);
  }

  return (
    <>
      <Container className="mt-5">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              React Todo List
            </Navbar.Brand>
            <Button variant="secondary" onClick={() => setShowAddModal(true)}>Add Todo</Button>
          </Container>
        </Navbar>
        <Table bordered >
          <thead>
            <tr>
              <th>Todo</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {todoList.sort((a, b) => {
              return b.priority - a.priority;
            }).sort((a, b) => {
              return a.status - b.status;
            }).map((todo) => {
              return (
                <tr key={todo.id} style={{ background: todo.status ? '#dedede' : '#fff' }}>
                  <td style={{ cursor: 'pointer' }} onClick={() => {
                    changeStatus(todo.id, todo.status);
                  }} >{todo.todo}</td>
                  <td>{PriorityTexts[todo.priority]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Button variant="secondary" onClick={() => clearAllDone()}>Clear All Done</Button>
      </Container>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(todoForm)}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Todo</InputGroup.Text>
              <FormControl
                {...register("todo", { required: true })}
                aria-label="Todo"
              />
            </InputGroup>
            {errors.todo && <div style={{ marginBottom: 10, color: 'red' }}>This field is required</div>}
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Priority</InputGroup.Text>
              <select className="form-control"  {...register("priority", { required: true })}>
                <option value="2">High</option>
                <option value="1">Medium</option>
                <option value="0">Low</option>
              </select>
            </InputGroup>
            <Button variant="primary" className="w-100" type="submit">
              Add
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
