const generateSudoku = (difficulty) => {
    const emptyCell = 0;
    const boardSize = 9;
  

    let attempts;

  switch (difficulty) {
    case 'easy':
      attempts = 5;
      break;
    case 'medium':
      attempts = 4;
      break;
    case 'hard':
      attempts = 3;
      break;
    default:
      attempts = 5; 
  }

    let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(emptyCell));
  
    for (let i = 0; i < boardSize; i += 3) {
      fillDiagonalSubgrid(board, i, i);
    }

    fillRemainingCells(board);  
    const solution = board.map(row => row.slice());
    removeCells(board, difficulty);
    return { puzzle: board, solution, attempts };
  };
  
  const fillDiagonalSubgrid = (board, row, col) => {
    const subgridSize = 3;
    const numbers = shuffle(Array.from({ length: 9 }, (_, i) => i + 1));
    for (let i = 0; i < subgridSize; i++) {
      for (let j = 0; j < subgridSize; j++) {
        board[row + i][col + j] = numbers[i * subgridSize + j];
      }
    }
  };
  
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  const fillRemainingCells = (board) => {
    fillCell(board, 0, 0);
  };
  
  const fillCell = (board, row, col) => {
    if (row === 9) return true;
    if (col === 9) return fillCell(board, row + 1, 0);
    if (board[row][col] !== 0) return fillCell(board, row, col + 1);
  
    for (let num = 1; num <= 9; num++) {
      if (isSafeToPlace(board, row, col, num)) {
        board[row][col] = num;
        if (fillCell(board, row, col + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  };
  
  const isSafeToPlace = (board, row, col, num) => {
    return (
      !usedInRow(board, row, num) &&
      !usedInCol(board, col, num) &&
      !usedInSubgrid(board, row - (row % 3), col - (col % 3), num)
    );
  };
  
  const usedInRow = (board, row, num) => {
    return board[row].includes(num);
  };
  
  const usedInCol = (board, col, num) => {
    return board.some(row => row[col] === num);
  };
  
  const usedInSubgrid = (board, rowStart, colStart, num) => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row + rowStart][col + colStart] === num) return true;
      }
    }
    return false;
  };
  
  const removeCells = (board, difficulty) => {
    let cellsToRemove;
    switch (difficulty) {
      case 'easy':
        cellsToRemove = 30;
        break;
      case 'medium':
        cellsToRemove = 40;
        break;
      case 'hard':
        cellsToRemove = 50;
        break;
      default:
        cellsToRemove = 30;
    }
  
    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (board[row][col] !== 0) {
        board[row][col] = 0;
        cellsToRemove--;
      }
    }
  };
  
  module.exports = generateSudoku;