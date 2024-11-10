# 🧩 Sudoku Game

A fully-functional Sudoku game built using **Next.js**, **TypeScript**, **Tailwind CSS** , and **Shadcn**. This project allows users to play Sudoku, validate their entries, and check for conflicts.

## 🚀 Features

- **Interactive Sudoku Board**: Allows users to input numbers into a 9x9 grid.
- **Validation**: Ensures that rows, columns, and 3x3 sub-grids have unique numbers.
- **Conflict Highlighting**: Highlights cells with conflicting entries.
- **Check Solution**: Users can validate their solution with a "Check Solution" button.

## 🛠️ Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **TypeScript**: A typed superset of JavaScript that helps with type safety.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **shadcn-ui**: For reusable button components.

## 📂 Project Structure

```
src/
├── utils/
│   └── actions.ts
├── components/
│   └── SudokuBoard.tsx         # Main component for the Sudoku game
└── pages/
    └── index.tsx               # Home page with Sudoku game board
```

## ⚙️ Installation and Setup

Follow these steps to set up the project on your local machine.

### Install Dependencies

```bash
npm install

```

### Running the Development Server

```bash
npm run dev

```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the game in action.

## 📝 Usage

1. **Input Numbers**: Click on any cell to enter a number between 1 and 9.
2. **Check Solution**: Click the "Check Solution" button to validate your board.
   - **Conflicting cells** will be highlighted in red.
3. **Edit Entries**: Change your entries and validate the solution again as needed.

## 🛠️ How It Works

### Validation Logic

- The board is validated using a function in `validateBoard.ts`, which checks:
  - Rows for duplicates.
  - Columns for duplicates.
  - 3x3 sub-grids for duplicates.
- The `checkSolution.ts` function checks if:
  - All cells are filled.
  - There are no conflicts.

### Highlighting

- If the "Check Solution" button is clicked:
  - Conflicting cells are highlighted in red.
- The board resets the highlights when the user makes changes.

## 🎨 Styling

The application is styled using **Tailwind CSS** for a responsive and clean design.

## 📦 Dependencies

- **react**: ^18.0.0
- **next**: ^13.0.0
- **typescript**: ^4.0.0
- **tailwindcss**: ^3.0.0
- **shadcn-ui**: ^1.0.0

## 📑 To-Do (Future Enhancements)

- Add a **timer** to track how long it takes to solve the puzzle.
- Implement a **hints system** to assist users.
- Allow users to **reset the board**.

## 📧 Contact

If you have any questions or feedback, feel free to reach out:

- **Email**: alaashouman221@gmail.com
- **GitHub**: [alaa-shouman](https://github.com/alaa-shouman/)
