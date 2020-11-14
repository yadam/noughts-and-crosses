import {
  Box,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from '@chakra-ui/core';
import { computer, player } from '../constants';
import { useSettingsState, useSettingsDispatch } from '../context/settings';
import { useStatusDispatch } from '../context/status';

export const MoveFirst = () => {
  const { movesFirst } = useSettingsState();
  const settingsDispatch = useSettingsDispatch();
  const statusDispatch = useStatusDispatch();

  const onChange = (e) => {
    settingsDispatch({ type: 'setMovesFirst', payload: e.target.value });
    statusDispatch({ type: 'reset' });
  };

  return (
    <Box p="1rem">
      <FormControl as="fieldset">
        <FormLabel as="legend">Who moves first?</FormLabel>
        <RadioGroup onChange={onChange} value={movesFirst}>
          <Radio variantColor="orange" value={player}>
            Player
          </Radio>
          <Radio variantColor="orange" value={computer}>
            Computer
          </Radio>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default MoveFirst;
