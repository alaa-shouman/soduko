export interface Conflict {
  row: number;
  col: number;
}

// Function to validate the entire board and return all conflicts
export const validateBoard = (board: number[][]): Conflict[] => {
  const conflicts: Conflict[] = [];

  // Check rows for duplicates
  for (let row = 0; row < board.length; row++) {
    const seen = new Map<number, number[]>();
    for (let col = 0; col < board[row].length; col++) {
      const value = board[row][col];
      if (value !== 0) {
        if (seen.has(value)) {
          seen.get(value)!.push(col);
        } else {
          seen.set(value, [col]);
        }
      }
    }
    seen.forEach((cols, value) => {
      if (cols.length > 1) {
        cols.forEach(col => conflicts.push({ row, col }));
      }
    });
  }

  // Check columns for duplicates
  for (let col = 0; col < board.length; col++) {
    const seen = new Map<number, number[]>();
    for (let row = 0; row < board.length; row++) {
      const value = board[row][col];
      if (value !== 0) {
        if (seen.has(value)) {
          seen.get(value)!.push(row);
        } else {
          seen.set(value, [row]);
        }
      }
    }
    seen.forEach((rows, value) => {
      if (rows.length > 1) {
        rows.forEach(row => conflicts.push({ row, col }));
      }
    });
  }

  // Check 3x3 sub-grids for duplicates
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Map<number, { row: number; col: number }[]>();
      for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
        for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
          const value = board[row][col];
          if (value !== 0) {
            if (seen.has(value)) {
              seen.get(value)!.push({ row, col });
            } else {
              seen.set(value, [{ row, col }]);
            }
          }
        }
      }
      seen.forEach((cells, value) => {
        if (cells.length > 1) {
          cells.forEach(cell => conflicts.push(cell));
        }
      });
    }
  }

  return conflicts;
};


export const checkSolution = (board: number[][]): boolean => {
  const allCellsFilled = board.every((row) => row.every((cell) => cell !== 0));

  if (!allCellsFilled) {
    return false;
  }
  const conflicts: Conflict[] = validateBoard(board);

  return conflicts.length === 0;
};

export const getEmptyCells = (board: number[][]): Conflict[] => {
  const emptyCells: Conflict[] = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }
  return emptyCells;
};

// generating a soduko Game

export type Difficulty = "easy" | "medium" | "hard";

export interface SudokuCell {
  value: number;
  isEditable: boolean;
}

const GRID_SIZE = 9;

const isValidPlacement = (
  board: number[][],
  row: number,
  col: number,
  num: number
): boolean => {
  for (let i = 0; i < GRID_SIZE; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
};

const fillBoard = (board: number[][]): boolean => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === 0) {
        const numbers = shuffleArray([...Array(9).keys()].map((i) => i + 1)); 
        for (const num of numbers) {
          if (isValidPlacement(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const shuffleArray = (array: number[]): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateFullBoard = (): number[][] => {
  const board = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0)
  );
  fillBoard(board);
  return board;
};
const countSolutions = (board: number[][]): number => {
  const clonedBoard = board.map(row => [...row]);
  return solve(clonedBoard) ? 1 : 0;
};

// Solve the board using backtracking to ensure it's solvable
export const solve = (board: number[][]): boolean => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidPlacement(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

// Generate a puzzle by removing cells based on difficulty level
export const generatePuzzle = (difficulty: Difficulty): SudokuCell[][] => {
  const fullBoard = generateFullBoard();
  const puzzle: SudokuCell[][] = fullBoard.map(row =>
    row.map(value => ({ value, isEditable: false }))
  );

  let cellsToRemove;
  switch (difficulty) {
    case "easy":
      cellsToRemove = 35;
      break;
    case "medium":
      cellsToRemove = 45;
      break;
    case "hard":
      cellsToRemove = 55;
      break;
  }

  let attempts = cellsToRemove;
  while (attempts > 0) {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);

    if (puzzle[row][col].value !== 0) {
      const removedValue = puzzle[row][col].value;
      puzzle[row][col].value = 0;
      puzzle[row][col].isEditable = true;

      if (countSolutions(puzzle.map(row => row.map(cell => cell.value))) !== 1) {
        puzzle[row][col].value = removedValue;
        puzzle[row][col].isEditable = false;
      } else {
        attempts--;
      }
    }
  }

  return puzzle;
};


export const solveBoard = (board: number[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidPlacement(board, row, col, num)) {
            board[row][col] = num;
            if (solveBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};


export const solveformanual = (board: number[][]): number[][] | null => {
  const clonedBoard = board.map((row) => [...row]); // Clone the board to avoid mutating the original

  if (solveBoard(clonedBoard)) {
    return clonedBoard; // Return the solved board if successful
  }
  return null; // Return null if no solution is found
};