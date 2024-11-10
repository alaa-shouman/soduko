import {
  checkSolution,
  Conflict,
  getEmptyCells,
  validateBoard,
  generatePuzzle,
  SudokuCell,
  Difficulty,
  solveformanual,
} from "@/app/utils/actions";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { useToast } from "../ToastProvider";
import DropdownButton from "./Buttons/dropdown";
import Link from "next/link";

const SudokuBoard: React.FC = () => {
  const [board, setBoard] = useState<SudokuCell[][]>( Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [emptyCells, setEmptyCells] = useState<Conflict[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const { showToast } = useToast();

  const handleGeneratePuzzle = (newBoard: SudokuCell[][]) => {
    setBoard(newBoard);
    setConflicts([]);
    setEmptyCells([]);
    setShowErrors(false);
    showToast("Generated a new puzzle!", "success");
  };

  const handleChange = (row: number, col: number, value: string) => {
    if (!/^[1-9]?$/.test(value)) return;
    const newBoard = board.map((rowArr, i) =>
      rowArr.map((cell, j) => {
        if (i === row && j === col && cell.isEditable) {
          return { ...cell, value: Number(value) };
        }
        return cell;
      })
    );
    setBoard(newBoard);
    const newConflicts = validateBoard(
      newBoard.map((row) => row.map((cell) => cell.value))
    );
    setConflicts(newConflicts);
  };

  const handleCheckSolution = () => {
    const isCorrect = checkSolution(
      board.map((row) => row.map((cell) => cell.value))
    );
    const emptyCells = getEmptyCells(
      board.map((row) => row.map((cell) => cell.value))
    );

    setConflicts(conflicts);
    setEmptyCells(emptyCells);
    setShowErrors(true);

    if (conflicts.length === 0 && emptyCells.length === 0) {
      showToast("Congratulations! Your solution is correct!", "success");
    } else {
      showToast("There are errors or empty cells in your solution.", "error");
    }
  };

  const handleSolution = () => {
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
  useEffect(() => {
    setBoard(generatePuzzle("medium"));
  }, []);
  return (
    <React.Fragment>
      <div className="flex justify-center mt-8">
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
                    className={`w-10 h-10 md:w-12 md:h-12 text-center font-bold text-lg md:text-xl border border-gray-300 ${cellClass}
                  ${
                    colIndex % 3 === 2 && colIndex !== 8 ? "border-r-black" : ""
                  }
                ${rowIndex % 3 === 2 && rowIndex !== 8 ? "border-b-black" : ""}
                    `}
                    type="text"
                    maxLength={1}
                    value={cell.value !== 0 ? cell.value : ""}
                    defaultValue=""
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
      </div>
      <div className="flex my-6 gap-4">
        <Button
          className="bg-teal-500 text-white hover:bg-teal-600"
          onClick={handleCheckSolution}
        >
          Check Solution
        </Button>
        <Button
          className="bg-teal-500 text-white hover:bg-teal-600"
          onClick={handleSolution}
        >
          Solve
        </Button>
        <DropdownButton
          onGenerate={(difficulty) =>
            handleGeneratePuzzle(generatePuzzle(difficulty))
          }
        />
        <Link href='/manualsolver' className={buttonVariants({ variant: "outline" })}>
          Manual Solver
        </Link>
      </div>
    </React.Fragment>
  );
};

export default SudokuBoard;
