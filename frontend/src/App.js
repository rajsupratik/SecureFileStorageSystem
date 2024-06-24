import React from 'react';
import Login from './components/Login';
import FileUpload from './components/FileUpload';

const App = () => {
  return (
    <div>
      <h1>Secure File Storage</h1>
      <Login />
      <FileUpload />
    </div>
  );
};

export default App;
