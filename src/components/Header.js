import { Heading, Flex } from '@chakra-ui/core';

export const Header = (props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="orange.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          Noughts and Crosses
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Header;
