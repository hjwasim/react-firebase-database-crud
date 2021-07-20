import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { ImBin2 } from 'react-icons/im';
import { BiPencil } from 'react-icons/bi';
import FireDb from './firebase.config';
import { onAdd, onRemove, onUpdate } from './utils/Firebase'
import Modal from 'react-modal'

import "./App.css"
import { customStyles } from './utils/styles.modal';
import Footer from './components/Footer';

Modal.setAppElement(document.getElementById('root'));

const App = () => {

  const fireRef = FireDb.ref("Todos")

  const [Todo, setTodo] = useState({
    todo: "",
    key: "",
    todos: []
  })

  const { register, handleSubmit } = useForm();
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {

    fireRef.on("value", (snapshot) => {

      let todoList = []
      let todo = snapshot.val();
      for (let key in todo) {
        todoList.push({ key, ...todo[key] });
      }

      setTodo({
        todos: todoList
      })

    });
    // eslint-disable-next-line
  }, [])


  // Modal actions...
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div id="todo" className="container my-auto">
      <div className="card my-3 p-3 d-flex  justify-content-center align-items-center">
        <h1 className="lead">Todo App</h1>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className="card p-3"
      >
        <div className="my-2">Edit - Todo</div>
        <form onSubmit={(e) => {
          e.preventDefault()
          onUpdate(Todo.key, Todo.todo, closeModal)
        }}>

          <input type="text" onChange={(e) => {
            setTodo({
              todo: e.target.value,
              key: Todo.key,
              todos: Todo.todos
            })
          }}
            className="form-control my-4 text-white"
            value={Todo.todo || ''} />

          <button className="btn btn-primary shadow-none w-100">Change</button>
        </form>
      </Modal>

      <div className="row">
        <div className="col-8">
          <div className="card my-3 p-3">
            <div>Todo List</div>
            <hr />
            <div>
              <ul className="list nav d-flex flex-column ">
                {
                  Todo.todos.map(todo => (
                    <li key={todo.key} className="my-2 card p-2 d-flex flex-row align-items-center justify-content-between">

                      <p className="m-0"> {todo.todo}</p>

                      <div className="action_icons">
                        <button onClick={_ => {
                          setTodo({
                            key: todo.key,
                            todo: todo.todo,
                            todos: Todo.todos
                          })
                          openModal()
                        }} className="mx-2 btn btn-warning shadow-none">
                          <BiPencil />
                        </button>

                        <button onClick={() => onRemove(todo.key)} className="mx-2 btn btn-danger shadow-none">
                          <ImBin2 />
                        </button>

                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card my-3 p-3">
            <div>Add List</div>
            <hr />

            <div>
              <form onSubmit={handleSubmit(onAdd)}>
                <input type="text" {...register('todo')} className="form-control shadow-none my-2 text-white" placeholder="Add an Item.." />
                <button className="btn btn-primary shadow-none w-100">Add</button>
              </form>
            </div>

          </div>
        </div>
        <Footer />
      </div>
    </div >
  )
}

export default App
