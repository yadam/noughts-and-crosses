import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';
import { beatable, player } from '../constants';

const SettingsStateContext = createContext();
const SettingsDispatchContext = createContext();

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'setMovesFirst': {
      return { ...state, movesFirst: action.payload };
    }
    case 'setDifficulty': {
      return { ...state, difficulty: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, {
    difficulty: beatable,
    movesFirst: player,
  });
  return (
    <SettingsStateContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsStateContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node,
};

SettingsProvider.defaultProps = {
  children: undefined,
};

export const useSettingsState = () => {
  const context = useContext(SettingsStateContext);
  if (context === undefined) {
    throw new Error('useSettingsState must be used within a SettingsProvider');
  }
  return context;
};

export const useSettingsDispatch = () => {
  const context = useContext(SettingsDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useSettingsDispatch must be used within a SettingsProvider',
    );
  }
  return context;
};

export default { SettingsProvider, useSettingsDispatch, useSettingsState };
