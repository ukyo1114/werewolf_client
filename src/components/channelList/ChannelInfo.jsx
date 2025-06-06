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
} from "@chakra-ui/react";

import { useUserState } from "../../context/UserProvider.jsx";
import { useJoinChannel } from "../../hooks/useJoinChannel";
import { EllipsisText } from "../miscellaneous/CustomComponents.jsx";
import ModalButton from "../miscellaneous/ModalButton.jsx";

const ChannelInfo = ({ selectedChannel }) => {
  const { user } = useUserState();
  const [password, setPassword] = useState("");
  const joinChannel = useJoinChannel();

  const { isBlocked, isJoined } = selectedChannel;

  return (
    <Stack spacing={4} overflow="hidden">
      <Box>
        <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={2}>
          {selectedChannel.channelName}
        </Text>
        <Flex gap={2} justifyContent="center" mb={2}>
          {selectedChannel.passwordEnabled && (
            <Badge colorScheme="blue" fontSize="sm">
              🔒 パスワード保護
            </Badge>
          )}
          {selectedChannel.denyGuests && (
            <Badge colorScheme="purple" fontSize="sm">
              👤 登録済みユーザーのみ
            </Badge>
          )}
        </Flex>
      </Box>

      <Divider borderWidth={1} borderColor="gray.700" />

      <Box>
        <Text fontWeight="bold" mb={2}>
          説明
        </Text>
        <Text
          overflow="auto"
          whiteSpace="pre-wrap"
          bg="gray.50"
          p={3}
          borderRadius="md"
        >
          {selectedChannel.channelDescription}
        </Text>
      </Box>

      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontWeight="bold" mb={1}>
            作成者
          </Text>
          <Text color="gray.600">{selectedChannel.channelAdmin.userName}</Text>
        </Box>
        <Box textAlign="right">
          <Text fontWeight="bold" mb={1}>
            プレイヤー数
          </Text>
          <Text color="gray.600">{selectedChannel.numberOfPlayers}人</Text>
        </Box>
      </Flex>

      {selectedChannel.passwordEnabled && !isJoined && (
        <FormControl id="password">
          <Input
            placeholder="パスワードを入力してください"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
          />
        </FormControl>
      )}

      <ModalButton
        data-testid="enter-button"
        colorScheme={isBlocked ? "pink" : "teal"}
        onClick={() => joinChannel(selectedChannel._id, password)}
        isDisabled={isBlocked || (user.isGuest && selectedChannel.denyGuests)}
        size="lg"
      >
        {isBlocked
          ? "ブロックされています"
          : user.isGuest && selectedChannel.denyGuests
            ? "ゲストは入室できません"
            : "入室"}
      </ModalButton>
    </Stack>
  );
};

export default ChannelInfo;
