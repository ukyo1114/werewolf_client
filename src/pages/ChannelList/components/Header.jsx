// External libraries
import { Box, Text, Button, Flex } from "@chakra-ui/react";

const Header = ({ showJoinedCh, setShowJoinedCh }) => {
  return (
    <Box
      bgImage="url('/Rough-white-canvas4.jpg')"
      bgSize="cover"
      bgPosition="center"
      borderRadius="md"
      p={4}
      mb={2}
      boxShadow="md"
      w="100%"
    >
      <Flex justify="space-between" align="center">
        <Text
          as="h2"
          fontSize="xl"
          fontWeight="bold"
          color="gray.800"
          letterSpacing="wider"
        >
          チャンネル一覧
        </Text>
        <Button
          size="sm"
          colorScheme={showJoinedCh ? "green" : "gray"}
          onClick={() => setShowJoinedCh(!showJoinedCh)}
        >
          {showJoinedCh ? "全チャンネル" : "参加済み"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
