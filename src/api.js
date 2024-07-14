import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const fetchPuzzle = async (difficulty) => {
  try {
    const response = await axios.get(`${API_URL}puzzle`, { params: { difficulty } });
    return response.data;
  } catch (error) {
    console.error('Error fetching puzzle:', error);
    throw error;
  }
};

export const registerUser = async (username) => {
  try {
    const response = await axios.post(`${API_URL}user/register`, { username });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getUserScores = async (username) => {
  try {
    const response = await axios.get(`${API_URL}user/${username}/scores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user scores:', error);
    throw error;
  }
};

export const addHighScore = async (username, score) => {
  try {
    const response = await axios.post(`${API_URL}user/scores`, { username, score });
    return response.data;
  } catch (error) {
    console.error('Error adding high score:', error);
    throw error;
  }
};