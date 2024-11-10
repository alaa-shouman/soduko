"use client";
import React, { useState } from "react";
import {
  checkSolution,
  solve,
  solveBoard,
  solveformanual,
  SudokuCell,
  validateBoard,
} from "../utils/actions";
import { Button } from "@/components/ui/button";
import Title from "@/components/SodukoBoard/Title";

const ManualSolver: React.FC = () => {
  const [board, setBoard] = useState<SudokuCell[][]>(
    Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => ({ value: 0, isEditable: true }))
    )
  );
  const [conflicts, setConflicts] = useState<{ row: number; col: number }[]>(
    []
  );

  const handleChange = (row: number, col: number, value: string) => {
    if (!/^[1-9]?$/.test(value)) return;

    const newBoard = board.map((rowArr, i) =>
      rowArr.map((cell, j) => {
        if (i === row && j === col) {
          return { ...cell, value: Number(value) };
        }
        return cell;
      })
    );
    setBoard(newBoard);

    // Check for conflicts after each change
    const flatBoard = newBoard.map((row) => row.map((cell) => cell.value));
    const newConflicts = validateBoard(flatBoard);
    setConflicts(newConflicts);
  };

  const handleSolve = () => {
    const flatBoard = board.map((row) => row.map((cell) => cell.value));
    const solvedBoard = solveformanual(flatBoard)
    if (solvedBoard !== null && checkSolution(solvedBoard)) {
      if (solvedBoard) {
        const updatedBoard = solvedBoard.map((row) =>
          row.map((value) => ({ value, isEditable: false }))
        );
        setBoard(updatedBoard);
        alert("Sudoku Solved!");
      } else {
        alert("No solution found!");
      }
    } else {
      alert("Invalid board!");
    }
  };

  const handleHint = () => {
    const flatBoard = board.map((row) => row.map((cell) => cell.value));
    const solvedBoard = solveformanual(flatBoard);
    console.log(solveBoard);
    if (!solvedBoard) {
      alert("No solution found!");
      return;
    }

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (flatBoard[row][col] === 0) {
          const hintValue = solvedBoard[row][col];
          const newBoard = board.map((r, i) =>
            r.map((c, j) =>
              i === row && j === col
                ? { ...c, value: hintValue, isEditable: false }
                : c
            )
          );
          setBoard(newBoard);
          return;
        }
      }
    }
  };

  const handleReset = () => {
    setBoard(
      Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => ({ value: 0, isEditable: true }))
      )
    );
    setConflicts([]);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <Title>Manual Solver</Title>
      <div className="grid grid-cols-9 gap-[1px] bg-gray-400 p-1">
        {board.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((cell, colIndex) => {
              const isConflict = conflicts.some(
                (conflict) =>
                  conflict.row === rowIndex && conflict.col === colIndex
              );
              const cellClass = cell.isEditable
                ? isConflict
                  ? "bg-red-200"
                  : "bg-white"
                : "bg-gray-300";

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-10 h-10 md:w-12 md:h-12 text-center font-bold text-lg md:text-xl border border-gray-300 ${cellClass} ${
                    colIndex % 3 === 2 && colIndex !== 8 ? "border-r-black" : ""
                  } ${
                    rowIndex % 3 === 2 && rowIndex !== 8 ? "border-b-black" : ""
                  }`}
                  type="text"
                  maxLength={1}
                  value={cell.value !== 0 ? cell.value : ""}
                  onChange={(e) =>
                    handleChange(rowIndex, colIndex, e.target.value)
                  }
                  disabled={!cell.isEditable}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="flex mt-6 gap-4">
        <Button className="bg-teal-500 text-white" onClick={handleSolve}>
          Solve
        </Button>
        <Button className="bg-blue-500 text-white" onClick={handleHint}>
          Hint
        </Button>
        <Button className="bg-red-500 text-white" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ManualSolver;
