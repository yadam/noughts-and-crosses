import { _, o, x } from './constants';
import { hasWinner, noMovesLeft } from './endgame';

/*
board indices:
[
  0, 1, 2,
  3, 4, 5,
  6, 7, 8
]
*/

describe('endgame', () => {
  describe('hasWinner', () => {
    describe('row winner', () => {
      it('finds a winner on the first row', () => {
        const board = [x, x, x, o, o, x, _, _, _];
        const expected = [0, 1, 2];
        const actual = hasWinner(board);
        expect(actual).toEqual(expected);
      });

      it('finds a winner on the second row', () => {
        const board = [x, x, _, o, o, o, _, x, _];
        const expected = [3, 4, 5];
        const actual = hasWinner(board);
        expect(actual).toEqual(expected);
      });

      it('finds a winner on the third row', () => {
        const board = [x, o, o, o, _, _, x, x, x];
        const expected = [6, 7, 8];
        const actual = hasWinner(board);
        expect(actual).toEqual(expected);
      });
    });

    describe('column winner', () => {
      it('finds a winner on the first column', () => {
        const board = [x, _, x, x, o, o, x, _, o];
        const expected = [0, 3, 6];
        const actual = hasWinner(board);
        expect(actual).toEqual(expected);
      });

      it('finds a winner on the second column', () => {
        const board = [o, x, _, o, x, o, _, x, _];
        const expected = [1, 4, 7];
        const actual = hasWinner(board);
        expect(actual).toEqual(expected);
      });

      it('finds a winner on the third column', () => {
        const board = [x, x, o, o, _, o, x, x, o];
        const expected = [2, 5, 8];
        const actual = hasWinner(board);
        expect(actual).toEqual(expected);
      });
    });

    describe('diagonal winner', () => {
      it('finds a winner from top left to bottom right', () => {
        const board = [x, _, o, o, x, _, _, _, x];
        const expected = [0, 4, 8];
        const actual = hasWinner(board);
        expect(actual).toEqual(expected);
      });

      it('finds a winner from bottom left to top right', () => {
        const board = [x, x, o, x, o, _, o, _, _];
        const expected = [2, 4, 6];
        const actual = hasWinner(board);
        expect(actual).toEqual(expected);
      });
    });
  });

  describe('noMovesLeft', () => {
    it('returns true if there are no moves left', () => {
      const board = [x, x, o, o, o, x, x, x, o];
      expect(noMovesLeft(board)).toBeTruthy();
    });

    it('returns false if there are moves left', () => {
      const board = [x, x, o, o, _, x, x, x, o];
      expect(noMovesLeft(board)).toBeFalsy();
    });
  });
});
