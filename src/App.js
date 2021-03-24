import React, { useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({
    'todo': {
      title: 'Todo',
      items: []
    },
    'in-progress': {
      title: 'In Progress',
      items: []
    },
    'done': {
      title: 'Completed',
      items: []
    }
  })

  return (
    <div className="App">

    </div>

  );
}

export default App;
