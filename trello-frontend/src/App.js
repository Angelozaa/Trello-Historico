// src/App.js
import React from 'react';
import TaskHistory from './components/TaskHistory'; // O caminho deve ser correto

const exampleHistory = [
    {
      id: 1,
      date: '2024-11-20T10:30:00Z',
      field: 'status',
      oldValue: 'A Fazer',
      newValue: 'Em Progresso',
    },
    {
      id: 2,
      date: '2024-11-20T12:00:00Z',
      field: 'prioridade',
      oldValue: 'Média',
      newValue: 'Alta',
    },
  ];

function App() {
    return (
        <div>
            <TaskHistory />
        </div>
    );
}

export default App;

