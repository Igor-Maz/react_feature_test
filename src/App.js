import React, { useState } from 'react';
import './App.css';
import { v4 } from 'uuid';

import data from './data_placeholder';

import DnD from './components/DnD';
import AddForm from './components/AddForm';
import NotificationProvider from './notifications/NotificationProvider'


function App() {

  const [state, setState] = useState(data)

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

  const addItem = (data) => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: 'Todo',
          items: [
            {
              id: v4(),
              content: data.content,
            },
            ...prev.todo.items
          ]
        }
      }
    })
  }

  return (
    <div className="App">
      <NotificationProvider>
        <AddForm
          addItem={addItem}
        />
        <DnD
          handleDragEnd={handleDragEnd}
          state={state}
          setState={setState}
        />
      </NotificationProvider>
    </div>

  );
}

export default App;
