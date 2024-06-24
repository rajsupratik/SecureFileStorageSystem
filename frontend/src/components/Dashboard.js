import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/files`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
      setMessage('Error fetching files');
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('File uploaded successfully');
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('File upload failed');
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
        {message && <p className={message.includes('success') ? 'success' : 'alert'}>{message}</p>}
      </div>
      <h3>Your Files</h3>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
