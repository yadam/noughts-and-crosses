import { o, x } from './constants';
import { hasWinner, noMovesLeft } from './endgame';

/*
board indices:
[
  0, 1, 2,
  3, 4, 5,
  6, 7, 8
]
*/

let computer;
let human;
let maxDepth;

/**
 * Gets the heuristic score for this board
 * @param   {string[]}  board - The board to analyze
 * @returns {number}    The score
 */
const getScore = (board) => {
  const winner = hasWinner(board);
  if (!winner) {
    return 0;
  }

  return board[winner[0]] === computer ? 10 : -10;
};

/**
 * The recursive minimax algorithm
 * @param   {string[]}  board - The board to analyze
 * @param   {number}    depth - The depth in the analysis
 * @param   {boolean}   isAiMove - true = maximizing, false = minimizing
 * @returns {number}    The minimax score
 */
const minimax = (board, depth, isAiMove) => {
  const score = getScore(board);

  if (score) {
    // take the depth into account so we find the fastest solution
    return score - depth;
  }

  if (noMovesLeft(board) || depth === maxDepth) {
    return 0;
  }

  let best = isAiMove ? -Infinity : Infinity;

  board.forEach((cell, index) => {
    if (cell) {
      // cell isn't empty, skip.
      return;
    }

    // clone the board
    const updatedBoard = [...board];

    // make the move
    updatedBoard[index] = isAiMove ? computer : human;

    // update the best move
    const updatedScore = minimax(updatedBoard, depth + 1, !isAiMove);
    best = isAiMove
      ? Math.max(best, updatedScore)
      : Math.min(best, updatedScore);
  });

  return best;
};

/**
 * Use minimax algorithm to find the best move
 * @param   {string[]}  board - The board to analyze
 * @param   {string}    player - The player mark to use (x or o)
 * @returns {string[]}  The updated board
 */
export const getMove = (board, player = x, depth = Infinity) => {
  let resultBoard;
  let best = -Infinity;

  computer = player;
  human = computer === x ? o : x;
  maxDepth = depth;

  board.forEach((cell, index) => {
    if (cell) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = computer;

    const updatedScore = minimax(updatedBoard, 0, false);
    if (updatedScore > best) {
      best = updatedScore;
      resultBoard = updatedBoard;
    }
  });

  return resultBoard;
};

export default getMove;
