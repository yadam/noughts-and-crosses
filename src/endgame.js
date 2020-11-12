/**
 * Determines if the board has no moves left
 * @param   {string[]}  board - The board to analyze
 * @returns {boolean}
 */
export const noMovesLeft = (board) => board.every((cell) => cell);

/**
 * Looks for a winner
 * @param   {string[]}              board - The board to analyze
 * @returns {(number[]|undefined)}  The winning indicies or undefined if there is no winner
 */
export const hasWinner = (board) => {
  // Check for row win
  for (let index = 0; index < board.length; index += 3) {
    if (
      board[index] &&
      board[index] === board[index + 1] &&
      board[index + 1] === board[index + 2]
    ) {
      return [index, index + 1, index + 2];
    }
  }

  // Check for column win
  for (let index = 0; index < 3; index += 1) {
    if (
      board[index] &&
      board[index] === board[index + 3] &&
      board[index + 3] === board[index + 6]
    ) {
      return [index, index + 3, index + 6];
    }
  }

  // Check for diagonal win
  if (board[0] && board[0] === board[4] && board[4] === board[8]) {
    return [0, 4, 8];
  }

  // Check for diagonal win
  if (board[2] && board[2] === board[4] && board[4] === board[6]) {
    return [2, 4, 6];
  }

  // No winner
  return undefined;
};

export default {
  hasWinner,
  noMovesLeft,
};
