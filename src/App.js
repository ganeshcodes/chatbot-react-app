import React from 'react';
import ChatBox from './components/ChatBox';
import './App.css'

function App() {
  return (
    <div className="app">
      <h1><i className='bi-robot'/> ChatBot</h1>
      <ChatBox />
    </div>
  );
}

export default App;