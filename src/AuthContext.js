import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [sessionId, setSessionId] = useState('');

  const startSession = async (username) => {
    try {
      const res = await axios.post('http://localhost:5002/api/users/addUser', { username });
      setUsername(username);
      setSessionId(res.data._id); // Assuming session ID is returned
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  const endSession = () => {
    setUsername('');
    setSessionId('');
  };

  return (
    <AuthContext.Provider value={{ username, sessionId, startSession, endSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };