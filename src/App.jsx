import React from 'react';
import TaskList from './TaskList';

function App() {
  return (
    <div style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Lista de Tarefas</h1>
      <TaskList />
    </div>
  );
}

export default App;
