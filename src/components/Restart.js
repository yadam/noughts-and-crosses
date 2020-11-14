import { Box, Button } from '@chakra-ui/core';
import { useStatusDispatch, useStatusState } from '../context/status';

export const Restart = () => {
  const { gameOver } = useStatusState();
  const dispatch = useStatusDispatch();

  const onClick = () => dispatch({ type: 'reset' });

  return (
    <Box p="1rem">
      <Button variantColor="orange" variant="solid" onClick={onClick}>
        {gameOver ? 'Play again?' : 'Start over?'}
      </Button>
    </Box>
  );
};

export default Restart;
