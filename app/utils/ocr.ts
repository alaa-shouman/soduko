import Tesseract from "tesseract.js";

export const extractSudokuFromImage = async (
  file: File
): Promise<number[][] | null> => {
  try {
    const image = URL.createObjectURL(file);
    const {
      data: { text },
    } = await Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    });

    // Process the OCR result to extract Sudoku numbers
    const board = parseSudokuText(text);
    console.log(board)
    return board;
  } catch (error) {
    console.error("Error recognizing Sudoku:", error);
    return null;
  }
};

// Parse the OCR text output into a 9x9 Sudoku board
const parseSudokuText = (text: string): number[][] | null => {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const board: number[][] = [];

  for (const line of lines) {
    const numbers = line
      .replace(/[^0-9]/g, "")
      .split("")
      .map(Number);
    if (numbers.length === 9) {
      board.push(numbers);
    }
  }

  // Ensure the board is 9x9
  return board.length === 9 ? board : null;
};
