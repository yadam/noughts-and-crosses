import {
  Box,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from '@chakra-ui/core';
import { beatable, unbeatable } from '../constants';
import { useSettingsState, useSettingsDispatch } from '../context/settings';

const mapValue = {
  beatable,
  unbeatable,
};

export const Difficulty = () => {
  const { difficulty } = useSettingsState();
  const dispatch = useSettingsDispatch();

  const onChange = (e) =>
    dispatch({ type: 'setDifficulty', payload: mapValue[e.target.value] });

  return (
    <Box p="1rem">
      <FormControl as="fieldset">
        <FormLabel as="legend">Difficulty?</FormLabel>
        <RadioGroup
          onChange={onChange}
          value={difficulty === beatable ? 'beatable' : 'unbeatable'}
        >
          <Radio variantColor="orange" value="beatable">
            Beatable
          </Radio>
          <Radio variantColor="orange" value="unbeatable">
            Unbeatable
          </Radio>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default Difficulty;
