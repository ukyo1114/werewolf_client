import { useState } from "react";

import {
  Stack,
  Divider,
  FormControl,
  Input,
  Flex,
  Text,
  Box,
  Badge,
  FormLabel,
} from "@chakra-ui/react";

import { useUserState } from "../../../context/UserProvider";
import { useJoinChannel } from "../../../commonHooks/useJoinChannel";
import { CustomButton, formProps } from "../../../components/CustomComponents";

const ChannelInfo = ({ selectedChannel }) => {
  const { user } = useUserState();
  const [password, setPassword] = useState("");
  const joinChannel = useJoinChannel();

  const { isBlocked, isJoined } = selectedChannel;

  return (
    <Stack spacing={6} overflow="hidden" maxW="400px" w="100%" mx="auto">
      <Box mb={2}>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          {selectedChannel.channelName}
        </Text>
        <Flex gap={2} justifyContent="center" mt={2}>
          {selectedChannel.passwordEnabled && (
            <Badge colorScheme="blue" fontSize="sm">
              🔒 パスワード付き
            </Badge>
          )}
          {selectedChannel.denyGuests && (
            <Badge colorScheme="purple" fontSize="sm">
              👤 ゲスト入室不可
            </Badge>
          )}
        </Flex>
      </Box>

      <Divider my={4} borderColor="gray.500" />

      <Box mb={2}>
        <Text fontWeight="bold" mb={2}>
          説明
        </Text>
        <Text
          overflow="auto"
          whiteSpace="pre-wrap"
          bg="gray.50"
          p={3}
          borderRadius="md"
          color="gray.800"
        >
          {selectedChannel.channelDescription}
        </Text>
      </Box>

      <Divider my={4} borderColor="gray.500" />

      <Flex mb={2}>
        <Text fontWeight="bold" mr={2}>
          作成者:
        </Text>
        <Text color="gray.600">{selectedChannel.channelAdmin.userName}</Text>
      </Flex>

      <Flex mb={2}>
        <Text fontWeight="bold" mr={2}>
          プレイ人数:
        </Text>
        <Text color="gray.600">{selectedChannel.numberOfPlayers}人</Text>
      </Flex>

      {selectedChannel.passwordEnabled && !isJoined && (
        <>
          <Divider my={4} borderColor="gray.500" />
          <FormControl mb={4} id="password">
            <FormLabel fontWeight="bold">パスワード</FormLabel>
            <Input
              placeholder="パスワードを入力してください"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              {...formProps}
            />
          </FormControl>
        </>
      )}

      <CustomButton
        data-testid="enter-button"
        colorScheme={isBlocked ? "pink" : "teal"}
        onClick={() => joinChannel(selectedChannel._id, password)}
        isDisabled={isBlocked || (user.isGuest && selectedChannel.denyGuests)}
        mt={2}
      >
        {isBlocked
          ? "ブロックされています"
          : user.isGuest && selectedChannel.denyGuests
            ? "ゲストは入室できません"
            : "入室"}
      </CustomButton>
    </Stack>
  );
};

export default ChannelInfo;
