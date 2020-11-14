import { Button, Text } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { loss, tie, win } from '../constants';
import { useStatusState } from '../context/status';

const statusMap = {
  [loss]: 'red.200',
  [tie]: 'white',
  [win]: 'blue.200',
};

const nameMap = [
  'top-left',
  'top-center',
  'top-right',
  'middle-left',
  'middle-center',
  'middle-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

export const Cell = ({ id, marker, onClick }) => {
  const { playerMarker, winner, winningIndicies } = useStatusState();

  const cellStatus = useCallback(() => {
    if (!winner || !winningIndicies?.includes(id)) {
      return statusMap[tie];
    }
    return winner === playerMarker ? statusMap[win] : statusMap[loss];
  }, [id, playerMarker, winner, winningIndicies]);

  return (
    <Button
      className="cell"
      name={nameMap[id]}
      title={nameMap[id]}
      w={['5rem', '7rem', '9rem', '11rem']}
      h={['5rem', '7rem', '9rem', '11rem']}
      bg={cellStatus()}
      border="4px"
      borderColor="orange.200"
      borderTopColor={[0, 1, 2].includes(id) ? 'white' : 'orange.200'}
      borderRightColor={[2, 5, 8].includes(id) ? 'white' : 'orange.200'}
      borderBottomColor={[6, 7, 8].includes(id) ? 'white' : 'orange.200'}
      borderLeftColor={[0, 3, 6].includes(id) ? 'white' : 'orange.200'}
      borderRadius="none"
      variant="ghost"
      disabled={marker && 'disabled'}
      onClick={onClick}
    >
      <Text fontSize={['3rem', '4rem', '5rem', '6rem']}>
        {marker?.toUpperCase()}
      </Text>
    </Button>
  );
};

Cell.propTypes = {
  id: PropTypes.number.isRequired,
  marker: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Cell.defaultProps = {
  marker: undefined,
};

export default Cell;
