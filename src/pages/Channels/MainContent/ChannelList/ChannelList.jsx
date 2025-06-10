import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUserState } from "../../../../context/UserProvider";
import {
  Box,
  Divider,
  Flex,
  Avatar,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { FaEllipsisH, FaCheck } from "react-icons/fa";
import ChatLoading from "../../../../components/ChatLoading";
import ChannelInfo from "./components/ChannelInfo";
import useNotification from "../../../../commonHooks/useNotification";
import { errors } from "../../../../messages";
import ModalTemplete from "../../../../components/miscellaneous/ModalTemplete";
import { EllipsisText } from "../../../../components/miscellaneous/CustomComponents";

const ChannelList = ({ showJoinedCh }) => {
  const { user, isMobile } = useUserState();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channelList, setChannelList] = useState([]);
  const [joinedChannels, setJoinedChannels] = useState([]);
  const [blockedChannels, setBlockedChannels] = useState([]);
  const channelInfo = useDisclosure();
  const showToast = useNotification();

  const fetchChannelList = useCallback(async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };

      const {
        data: { channelList, joinedChannels, blockedChannels },
      } = await axios.get("/api/channel/list", config);

      if (!Array.isArray(channelList)) {
        throw new Error("Invalid channel list response");
      }

      setChannelList(channelList);
      setJoinedChannels(joinedChannels || []);
      setBlockedChannels(blockedChannels || []);
    } catch (error) {
      showToast(
        error?.response?.data?.error || errors.FETCH_CHANNEL_LIST,
        "error"
      );
      // エラー時は空の配列をセット
      setChannelList([]);
      setJoinedChannels([]);
      setBlockedChannels([]);
    }
  }, [user.token, showToast]);

  useEffect(() => {
    fetchChannelList();
  }, [fetchChannelList]);

  const filteredChannelList = showJoinedCh
    ? channelList.filter((channel) => joinedChannels.includes(channel._id))
    : channelList.filter((channel) => !blockedChannels.includes(channel._id));

  const handleChannelSelect = (channel) => {
    const isBlocked = blockedChannels.includes(channel._id);
    const isJoined = joinedChannels.includes(channel._id);
    setSelectedChannel({ ...channel, isBlocked, isJoined });
    channelInfo.onOpen();
  };

  return channelList.length > 0 ? (
    <Stack overflowY="auto" width="100%" p={4} gap={4}>
      <Box
        bgImage="url('/Rough-white-canvas4.jpg')"
        bgSize="cover"
        bgPosition="center"
        borderRadius="md"
        p={4}
        mb={2}
        boxShadow="md"
      >
        <Text
          as="h2"
          fontSize="xl"
          fontWeight="bold"
          color="gray.800"
          letterSpacing="wider"
        >
          チャンネル一覧
        </Text>
      </Box>
      {filteredChannelList.map((channel, idx) => {
        if (!channel.channelAdmin) return null;

        const isJoined = joinedChannels.includes(channel._id);
        const isBlocked = blockedChannels.includes(channel._id);

        // デスクトップ時のみ幅80%、左右互い違い（偶数:右寄せ, 奇数:左寄せ）
        const boxWidth = isMobile ? "100%" : "80%";
        const boxMargin = isMobile
          ? undefined
          : idx % 2 === 0
            ? { ml: "auto" }
            : { mr: "auto" };

        return (
          <Box
            data-key={channel._id}
            onClick={() => handleChannelSelect(channel)}
            cursor="pointer"
            p={2}
            w={boxWidth}
            key={channel._id}
            _hover={{
              bg: "gray.200",
            }}
            bgImage="url('/blank-map5.jpg')"
            bgSize="cover"
            bgPosition="center"
            boxShadow="uniform"
            {...boxMargin}
          >
            <Flex justify="space-between" align="center" width="100%" gap={2}>
              <Avatar
                size={isMobile ? "md" : "lg"}
                src={channel.channelAdmin.pic}
                borderRadius={isMobile ? "md" : "lg"}
              />

              <Box textAlign="left" w="100%" overflow="hidden">
                <EllipsisText mb={1}>
                  タイトル： {channel.channelName}{" "}
                  {isJoined && (
                    <FaCheck
                      color="#38A169"
                      style={{ display: "inline", marginLeft: 4 }}
                    />
                  )}
                </EllipsisText>
                <Divider borderWidth={1} borderColor="gray.700" mb={1} />
                <EllipsisText mb={1}>
                  作成者： {channel.channelAdmin.userName}
                </EllipsisText>
                <Flex gap={2} fontSize="sm" color="gray.600">
                  <Text>プレイヤー数: {channel.numberOfPlayers}人</Text>
                  {channel.passwordEnabled && <Text>🔒</Text>}
                  {channel.denyGuests && <Text>👤</Text>}
                  {(isBlocked || (user.isGuest && channel.denyGuests)) && (
                    <Text>🚫</Text>
                  )}
                </Flex>
              </Box>

              <Box color="gray.700">
                <FaEllipsisH />
              </Box>
            </Flex>
          </Box>
        );
      })}
      {selectedChannel && (
        <ModalTemplete
          isOpen={channelInfo.isOpen}
          onClose={channelInfo.onClose}
          title={"チャンネル情報"}
        >
          <ChannelInfo selectedChannel={selectedChannel} />
        </ModalTemplete>
      )}
    </Stack>
  ) : (
    <ChatLoading />
  );
};

export default ChannelList;
