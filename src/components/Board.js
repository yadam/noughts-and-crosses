import { Flex, useToast } from '@chakra-ui/core';
import { useEffect } from 'react';
import { getMove } from '../ai';
import { Cell } from './Cell';
import { o, player, tie, x } from '../constants';
import { useSettingsState } from '../context/settings';
import { useStatusDispatch, useStatusState } from '../context/status';

const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const getToast = (title, status) => ({
  title,
  status,
  isClosable: true,
  position: 'top',
});

export const Board = () => {
  const toast = useToast();
  const { difficulty } = useSettingsState();
  const { board, gameOver, playerMarker, turn, winner } = useStatusState();
  const dispatch = useStatusDispatch();

  useEffect(() => {
    switch (winner) {
      case playerMarker:
        toast(getToast('You won!', 'success'));
        break;
      case playerMarker === x ? o : x:
        toast(getToast('You lost!', 'error'));
        break;
      case tie:
        toast(getToast("Cat's game!", 'info'));
        break;
      default:
        break;
    }
  }, [playerMarker, toast, winner]);

  useEffect(() => {
    if (turn === player || gameOver) {
      return;
    }

    // Get AI move
    const updated = getMove(board, playerMarker === x ? o : x, difficulty);
    dispatch({ type: 'takeTurn', payload: updated });
  }, [board, difficulty, dispatch, gameOver, playerMarker, turn]);

  const clickHandler = (id) => () => {
    if (board[id] || gameOver) {
      // Space already has a mark. Abort.
      return;
    }
    const updated = [...board];
    updated[id] = playerMarker;
    dispatch({ type: 'takeTurn', payload: updated });
  };

  return (
    <Flex
      w={['16rem', '22rem', '29rem', '33rem']}
      mx="auto"
      my="3rem"
      wrap="wrap"
      justify="center"
      align="center"
    >
      {cells.map((id, index) => (
        <Cell
          key={id}
          id={id}
          marker={board[index]}
          onClick={clickHandler(id)}
        />
      ))}
    </Flex>
  );
};

export default Board;
