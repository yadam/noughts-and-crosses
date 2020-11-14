import { getMove } from './ai';
import { _, o, x } from './constants';
import { getWinningIndicies, noMovesLeft } from './endgame';

/*
board indices:
[
  0, 1, 2,
  3, 4, 5,
  6, 7, 8
]
*/

const beatableDepth = 1;

describe('ai', () => {
  describe('beatable', () => {
    const verifyBoard = (expected, actual) =>
      expected.every((cell, index) => actual[index] === cell);

    it('wins', () => {
      const initial = [x, o, x, o, o, x, _, _, _];
      const expected = [x, o, x, o, o, x, _, _, x];

      const actual = getMove(initial, x, beatableDepth);

      expect(verifyBoard(expected, actual)).toBeTruthy();
    });

    it('blocks', () => {
      const initial = [x, o, _, o, _, _, x, x, _];
      const expected = [x, o, _, o, _, _, x, x, o];

      const actual = getMove(initial, o, beatableDepth);

      expect(verifyBoard(expected, actual)).toBeTruthy();
    });
  });

  describe('unbeatable', () => {
    const verifyBoard = (expected, actual) =>
      expected.every((cell, index) => actual[index] === cell);

    it('wins', () => {
      const initial = [x, o, x, o, o, x, _, _, _];
      const expected = [x, o, x, o, o, x, _, _, x];

      const actual = getMove(initial);

      expect(verifyBoard(expected, actual)).toBeTruthy();
    });

    it('blocks', () => {
      const initial = [x, o, _, o, _, _, x, x, _];
      const expected = [x, o, _, o, _, _, x, x, o];

      const actual = getMove(initial, o);

      expect(verifyBoard(expected, actual)).toBeTruthy();
    });

    it('is unbeatable when the player moves first', () => {
      const initial = [_, _, _, _, _, _, _, _, _];
      let board = initial;
      let move = 0;

      while (!getWinningIndicies(board) && !noMovesLeft(board)) {
        const isEven = !!(move % 2);
        const marker = isEven ? o : x;
        const maxDepth = isEven ? Infinity : beatableDepth;
        board = getMove(board, marker, maxDepth);
        move += 1;
      }

      const winner = getWinningIndicies(board);
      const hasNoMoves = noMovesLeft(board);

      expect(winner === undefined || board[winner[0]] === o).toBeTruthy();
      expect(
        (winner === undefined && hasNoMoves) ||
          (!hasNoMoves && board[winner[0]] === o),
      ).toBeTruthy();
    });

    it('is unbeatable when the computer moves first', () => {
      const initial = [_, _, _, _, _, _, _, _, _];
      let board = initial;
      let move = 0;

      while (!getWinningIndicies(board) && !noMovesLeft(board)) {
        const isEven = !!(move % 2);
        const marker = isEven ? o : x;
        const maxDepth = isEven ? beatableDepth : Infinity;
        board = getMove(board, marker, maxDepth);
        move += 1;
      }

      const winner = getWinningIndicies(board);
      const hasNoMoves = noMovesLeft(board);

      expect(winner === undefined || board[winner[0]] === x).toBeTruthy();
      expect(
        (winner === undefined && hasNoMoves) ||
          (!hasNoMoves && board[winner[0]] === x),
      ).toBeTruthy();
    });

    it('is unbeatable against a randomly moving opponent', () => {
      const initial = [_, _, _, _, _, _, _, _, _];
      let board = initial;
      let move = 0;

      while (!getWinningIndicies(board) && !noMovesLeft(board)) {
        const isEven = !!(move % 2);
        const marker = isEven ? o : x;
        if (!isEven) {
          let random;
          do {
            random = Math.floor(Math.random() * 9);
          } while (board[random]);
          board[random] = marker;
        } else {
          board = getMove(board, marker);
        }
        move += 1;
      }

      const winner = getWinningIndicies(board);
      const hasNoMoves = noMovesLeft(board);

      expect(winner === undefined || board[winner[0]] === o).toBeTruthy();
      expect(
        (winner === undefined && hasNoMoves) ||
          (!hasNoMoves && board[winner[0]] === o),
      ).toBeTruthy();
    });
  });
});
