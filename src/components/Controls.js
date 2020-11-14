import { Box, Flex } from '@chakra-ui/core';
import { Difficulty } from './Difficulty';
import { MoveFirst } from './MoveFirst';
import { Restart } from './Restart';

export const Controls = () => {
  return (
    <Flex
      w={['16rem', '22rem', '29rem', '33rem']}
      mx="auto"
      my="3rem"
      wrap="wrap"
      justify="space-evenly"
      align="center"
    >
      <Box w="11rem" order={[1, 1, 1, 1]}>
        <Difficulty />
      </Box>
      <Box w="11rem" order={[3, 3, 3, 2]}>
        <Restart />
      </Box>
      <Box w="11rem" order={[2, 2, 2, 3]}>
        <MoveFirst />
      </Box>
    </Flex>
  );
};

export default Controls;
