import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import _ from 'lodash';
import { v4 } from 'uuid';

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

  return (
    <div className="App">
      <DragDropContext onDragEnd={e => console.log(e)}>
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
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={'item'}
                                >
                                  {el.content}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
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
