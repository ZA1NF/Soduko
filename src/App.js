import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [puzzle, setPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [errors, setErrors] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);
  const [puzzleId, setPuzzleId] = useState(null);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userId) {
      getPuzzle();
    }
  }, [difficulty, userId]);

  useEffect(() => {
    if (!gameOver && userId) {
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else {
      clearInterval(intervalId);
    }
  }, [gameOver, userId]);

  const getPuzzle = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/api/1.0.0/puzzle?difficulty=${difficulty}`);
      setPuzzle(response.data.puzzle);
      setSolution(response.data.solution);
      setTimer(0);
      setGameOver(false);
      setErrors([]);
      setAttempts(response.data.attempts);
      setPuzzleId(response.data._id); // Save the puzzle ID for submitting the solution
      setScore(0); // Reset the score when a new puzzle is fetched
    } catch (error) {
      console.error('Error fetching the puzzle', error);
    }
  };

  const checkSolution = () => {
    const newErrors = [];
    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle[i].length; j++) {
        if (puzzle[i][j] !== solution[i][j]) {
          newErrors.push([i, j]);
        }
      }
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleCellChange = (row, col, value) => {
    if (value >= 0 && value <= 9) {
      const newPuzzle = puzzle.map((r, i) =>
        r.map((cell, j) => (i === row && j === col ? value : cell))
      );

      setPuzzle(newPuzzle);
      setErrors(errors.filter(([r, c]) => r !== row || c !== col));
    }
  };

  const handleSolve = async () => {
    const correctCells = puzzle.reduce((acc, row, i) => {
      return acc + row.reduce((cellAcc, cell, j) => {
        return cellAcc + (cell === solution[i][j] ? 1 : 0);
      }, 0);
    }, 0);
    
    setScore((correctCells * 5)-255);

    if (checkSolution()) {
      setGameOver(true);
      alert('Congratulations! You solved the puzzle!');
    } else {
      if (attempts > 1) {
        setAttempts(attempts - 1);
        alert(`There are errors in your solution. You have ${attempts - 1} attempts left. Keep trying!`);
      } else {
        setGameOver(true);
        setScore(0); // Reset the score when all attempts are used
        alert('You have used all your attempts. Game over!');
      }
    }
  };

  const submitScore = async () => {
    try {
      await axios.post('http://localhost:5002/api/1.0.0/scoreboard/submit', {
        userId,
        puzzleId,
        totalScore: score,
        time: timer,
      });
    } catch (error) {
      console.error('Error saving score', error);
    }
  };

  const handleUserSubmit = async () => {
    if (userName.trim()) {
      try {
        const response = await axios.post('http://localhost:5002/api/1.0.0/user/addUser', { name: userName });
        setUserId(response.data.userId);
        setErrorMessage('');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessage('Name already taken. Please enter a different name.');
        } else {
          console.error('Error adding user', error);
        }
      }
    } else {
      setErrorMessage('Please enter your name.');
    }
  };

  useEffect(() => {
    if (gameOver && (score > 0 || attempts === 0)) {
      submitScore();
    }
  }, [gameOver, score, attempts]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sudoku Game</h1>
        {!userId ? (
          <div>
            <label>
              Enter your name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <button onClick={handleUserSubmit}>Submit</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        ) : (
          <>
            <div>
              <label>
                Difficulty:
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>
              <button onClick={getPuzzle}>New Puzzle</button>
            </div>
            <div className="grid">
              {puzzle.flat().map((cell, index) => {
                const rowIndex = Math.floor(index / 9);
                const colIndex = index % 9;
                return (
                  <input
                    key={index}
                    type="number"
                    min="0"
                    max="9"
                    value={cell || ''}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, parseInt(e.target.value, 10))}
                    className={
                      errors.some(([r, c]) => r === rowIndex && c === colIndex)
                        ? 'editable error'
                        : cell === 0
                        ? 'editable'
                        : 'fixed'
                    }
                  />
                );
              })}
            </div>
            <button onClick={handleSolve} disabled={gameOver}>Check Solution</button>
            <p>Time: {timer} seconds</p>
            <p>Attempts Left: {attempts}</p>
            <p>Score: {score}</p>
          </>
        )}
      </header>
    </div>
  );
};

export default App;