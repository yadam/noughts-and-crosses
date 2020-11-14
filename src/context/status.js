import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useReducer } from 'react';
import { _, computer, o, player, x } from '../constants';
import { getWinningIndicies, isGameOver, whoWon } from '../endgame';
import { useSettingsState } from './settings';

const StatusStateContext = createContext();
const StatusDispatchContext = createContext();

export const StatusProvider = ({ children }) => {
  const { movesFirst } = useSettingsState();

  const getInitialState = useCallback(
    () => ({
      board: [_, _, _, _, _, _, _, _, _],
      gameOver: false,
      gameStarted: false,
      playerMarker: movesFirst === player ? x : o,
      turn: movesFirst,
      winner: undefined,
      winningIndicies: undefined,
    }),
    [movesFirst],
  );

  const statusReducer = (state, action) => {
    switch (action.type) {
      case 'reset': {
        return getInitialState();
      }
      case 'takeTurn': {
        const board = action.payload;
        const gameOver = isGameOver(board);
        return {
          ...state,
          board: action.payload,
          gameOver,
          gameStarted: true,
          turn: state.turn === player ? computer : player,
          winner: gameOver ? whoWon(board) : undefined,
          winningIndicies: gameOver ? getWinningIndicies(board) : undefined,
        };
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  };

  const [state, dispatch] = useReducer(statusReducer, getInitialState());
  return (
    <StatusStateContext.Provider value={state}>
      <StatusDispatchContext.Provider value={dispatch}>
        {children}
      </StatusDispatchContext.Provider>
    </StatusStateContext.Provider>
  );
};

StatusProvider.propTypes = {
  children: PropTypes.node,
};

StatusProvider.defaultProps = {
  children: undefined,
};

export const useStatusState = () => {
  const context = useContext(StatusStateContext);
  if (context === undefined) {
    throw new Error('useStatusState must be used within a StatusProvider');
  }
  return context;
};

export const useStatusDispatch = () => {
  const context = useContext(StatusDispatchContext);
  if (context === undefined) {
    throw new Error('useStatusDispatch must be used within a StatusProvider');
  }
  return context;
};

export default { StatusProvider, useStatusDispatch, useStatusState };
