import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Login = () => {
  const { startSession } = useContext(AuthContext);
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await startSession(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Start</button>
    </form>
  );
};

export default Login;
