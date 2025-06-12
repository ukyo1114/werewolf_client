import { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { Flex, Stack } from "@chakra-ui/react";

import { useUserState } from "../../../context/UserProvider.jsx";
import Chat from "./Chat.jsx";
import ChannelHeader from "../Header/ChannelHeader.jsx";
// import { ChannelHeader } from "../../components/channels/ChannelHeader.jsx";
// import ChannelListSidebar from "../../components/channelList/ChannelListSidebar.jsx";

/* const ChannelSidebar = lazy(
  () => import("../../components/channelSideBar/ChannelSidebar.jsx")
); */
/* const GameSidebar = lazy(
  () => import("../../components/gameSidebar/GameSidebar.jsx")
); */

const Channel = () => {
  const [mode, setMode] = useState(null);
  const { user, uDispatch, currentChannel, isMobile } = useUserState();
  const { _id: channelId, isGame, phase } = currentChannel;

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate("/");
    } else {
      const userIn = JSON.parse(userInfo);
      uDispatch({ type: "LOGIN", payload: userIn });
    }
  }, [navigate, uDispatch]);

  useEffect(() => {
    if (!channelId) {
      navigate("/channel-list");
    }
  }, [channelId, navigate]);

  useEffect(() => {
    const currentMode = isGame ? "game" : "channel";
    setMode(currentMode);
  }, [isGame, setMode]);

  // 背景画像の決定ロジック
  let bgImage, bgSize, bgPosition, bgRepeat;
  if (mode === "channel") {
    bgImage = "url('/The-citys-main-street2.jpg')";
    bgSize = "cover";
    bgPosition = "center";
    bgRepeat = "no-repeat";
  } else if (mode === "game" && phase?.currentPhase === "night") {
    bgImage = "url('/night-sky3.jpg')";
    bgSize = "cover";
    bgPosition = "center";
    bgRepeat = "no-repeat";
  } else if (mode === "game") {
    bgImage = "url('/cafe2.jpg')";
    bgSize = "cover";
    bgPosition = "center";
    bgRepeat = "no-repeat";
  }

  if (!user.token) return null;

  return (
    <Flex
      justifyContent="center"
      w="100%"
      h="100dvh"
      overflow="hidden"
      bgImage={bgImage}
      bgSize={bgSize}
      bgPosition={bgPosition}
      bgRepeat={bgRepeat}
    >
      <Stack
        alignItems="center"
        maxW="container.lg"
        overflow="hidden"
        w="100%"
        m={isMobile ? 2 : 4}
        gap={4}
      >
        <ChannelHeader />
        {channelId && <Chat key={channelId} />}
      </Stack>
    </Flex>
  );
};

export default Channel;
