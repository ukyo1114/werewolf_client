// React and related
import { useEffect, useState, useCallback } from "react";

// External libraries
import {
  Box,
  Text,
  useDisclosure,
  Stack,
  Flex,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { FaCheck, FaEllipsisH } from "react-icons/fa";

// Internal components
import ModalTemplete from "../../../components/ModalTemplete";
import { EllipsisText } from "../../../components/miscellaneous/CustomComponents";
import Header from "./Header";

// Internal hooks
import { useUserState } from "../../../context/UserProvider";
import { useAuthCheck } from "../../../commonHooks/useAuthCheck";
// import ChannelInfo from "./ChannelInfo";
import useFetchChannelList from "../hooks/useFetchChannelList";

const ChannelList = () => {
  // React hooks
  const [channelList, setChannelList] = useState([]);
  const [joinedChannels, setJoinedChannels] = useState([]);
  const [blockedChannels, setBlockedChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showJoinedCh, setShowJoinedCh] = useState(false);
  const channelInfo = useDisclosure();

  // Custom hooks
  const { user } = useAuthCheck();
  const { isMobile } = useUserState();
  const { fetchChannelList } = useFetchChannelList({
    setChannelList,
    setJoinedChannels,
    setBlockedChannels,
  });

  const handleChannelSelect = useCallback(
    (channel) => {
      const isBlocked = blockedChannels.includes(channel._id);
      const isJoined = joinedChannels.includes(channel._id);
      setSelectedChannel({ ...channel, isBlocked, isJoined });
      channelInfo.onOpen();
    },
    [blockedChannels, joinedChannels, channelInfo]
  );

  // Effects
  useEffect(() => {
    fetchChannelList();
  }, [fetchChannelList]);

  // Computed values
  const filteredChannelList = showJoinedCh
    ? channelList.filter((channel) => joinedChannels.includes(channel._id))
    : channelList.filter((channel) => !blockedChannels.includes(channel._id));

  if (!user.token) return null;

  return channelList.length > 0 ? (
    <Flex
      justifyContent="center"
      w="100%"
      h="100dvh"
      overflow="hidden"
      bgImage="url('/cork-board2.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Stack alignItems="center" maxW="container.lg" overflow="hidden" w="100%">
        <Header showJoinedCh={showJoinedCh} setShowJoinedCh={setShowJoinedCh} />
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
            {/* <ChannelInfo selectedChannel={selectedChannel} /> */}
          </ModalTemplete>
        )}
      </Stack>
    </Flex>
  ) : (
    <div>Loading...</div>
  );
};

export default ChannelList;
