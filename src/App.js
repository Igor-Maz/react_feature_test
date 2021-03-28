import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import _ from 'lodash';
import { v4 } from 'uuid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from './TextInput';

const formSchema = Yup.object().shape({
  email: Yup.string().required('provide an email').email('it needs to be an email address'),
  password: Yup.string().required('provide a password').min(6)
})

const item1 = {
  id: v4(),
  content: "learn beautiful dnd"
}

const item2 = {
  id: v4(),
  content: "prepare Drag 'n drop items"
}

const item3 = {
  id: v4(),
  content: "learn sidebar"
}

const item4 = {
  id: v4(),
  content: "prepare sidebar"
}

const item5 = {
  id: v4(),
  content: "learn formik"
}

const item6 = {
  id: v4(),
  content: "prepare formik"
}

function App() {
  const [text, setText] = useState('');

  const [state, setState] = useState({
    'todo': {
      title: 'Todo',
      items: [item1, item2]
    },
    'in-progress': {
      title: 'In Progress',
      items: [item3, item4]
    },
    'done': {
      title: 'Completed',
      items: [item5, item6]
    }
  })

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return
    }
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }
    //Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] }

    setState(prev => {
      prev = { ...prev }
      //Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)
      //Adding to new items array location by using splice with deleteCount = 0
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }

  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: 'Todo',
          items: [
            {
              id: v4(),
              content: text,
            },
            ...prev.todo.items
          ]
        }
      }
    })
    setText('')
  }

  return (
    <div className="App">
      <div>
        {/* <input type='text' value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick= {addItem}>Add</button> */}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={formSchema}
          onSubmit={(data => console.log(data))}
        >
          {({
            handleSubmit,
            // handleChange,
            // handleBlur,
            // values,
            // errors,
            // touched
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                {/* <label htmlFor='email'>Email</label>
                  <input
                    type='text'
                    name={'email'}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={'Email...'}
                  />
                  {errors.email && touched.email && <p className={'error'}>{errors.email}</p>} */}
                <TextInput
                  name={'email'}
                  placeholder={'email...'}
                  label={'Email:'}
                />
                <TextInput
                  name={'password'}
                  placeholder={'password...'}
                  label={'Password:'}
                />
                <button type={'submit'}>Submit</button>
              </form>

            )
          }}
        </Formik>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className={'column'}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={'droppable-col'}
                    >
                      {data.items.map((el, index) => {
                        return (
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`item ${snapshot.isDragging && 'dragging'}`}
                                >
                                  {el.content}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>

  );
}

export default App;
