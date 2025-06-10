import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Flex, Button, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import UserList from "../../../components/miscellaneous/UserList.jsx";
import ModalTemplete from "../../../components/miscellaneous/ModalTemplete.jsx";
import { EllipsisText } from "../../../components/miscellaneous/CustomComponents.jsx";
import useNotification from "../../../hooks/useNotification";
import useJoinGame from "../../../hooks/useJoinGame";
import { useUserState } from "../../../context/UserProvider.jsx";

const ChannelHeader = () => {
  const { user, currentChannel } = useUserState();
  const [users, setUsers] = useState([]);
  const [entryButtonState, setEntryButtonState] = useState(false);
  const showToast = useNotification();
  const userList = useDisclosure();
  const { _id: channelId, channelName } = currentChannel;
  const joinGame = useJoinGame();

  const entrySocketRef = useRef(null);

  useEffect(() => {
    if (entrySocketRef.current) return;

    const auth = { auth: { token: user.token, channelId } };
    entrySocketRef.current = io(`${import.meta.env.VITE_SERVER_URL}/entry`, {
      ...auth,
      withCredentials: true,
      transports: ["websocket"],
      path: "/socket.io",
    });

    entrySocketRef.current.on("connect_response", (users) => {
      setUsers(users);
    });

    entrySocketRef.current.on("entryUpdate", (data) => {
      setUsers(data);
    });

    entrySocketRef.current.on("gameStart", async (gameId) => {
      await joinGame(gameId);
    });

    entrySocketRef.current.on("connect_error", (err) => {
      entrySocketRef.current.disconnect();
    });

    return () => {
      entrySocketRef.current.disconnect();
    };
  }, [user.token, channelId, joinGame]);

  useEffect(() => {
    setEntryButtonState(users.some((u) => u === user.userId));
  }, [users, user.userId, setEntryButtonState]);

  return (
    <>
      <EllipsisText fontSize="lg" fontWeight="bold" color="gray.700">
        {channelName}
      </EllipsisText>

      <Flex alignItems="center">
        <EllipsisText
          fontSize="lg"
          onClick={userList.onOpen}
          cursor="pointer"
          display="flex"
          alignItems="center"
          px={2}
          mr={2}
          py="5px"
          borderRadius="md"
          _hover={{ bg: "gray.200" }}
        >
          {users.length}/10人
          <ChevronDownIcon ml={1} />
        </EllipsisText>

        <Button
          data-testid="entry-button" // テスト用
          colorScheme={entryButtonState ? "pink" : "teal"}
          onClick={() => {
            if (entryButtonState) {
              entrySocketRef.current.emit("cancelEntry", (response) => {
                if (!response.success) {
                  showToast(
                    response.message ||
                      "エントリーをキャンセルできませんでした",
                    "error"
                  );
                }
              });
            } else {
              entrySocketRef.current.emit("registerEntry", (response) => {
                if (!response.success) {
                  showToast(
                    response.message || "エントリーに失敗しました",
                    "error"
                  );
                }
              });
            }
          }}
        >
          {entryButtonState ? "取消" : "参加"}
        </Button>
      </Flex>

      {users && currentChannel.users && (
        <ModalTemplete
          isOpen={userList.isOpen}
          onClose={userList.onClose}
          title={"エントリー中のユーザー"}
        >
          <UserList
            userList={currentChannel.users.filter((user) =>
              users.some((u) => u === user._id)
            )}
          />
        </ModalTemplete>
      )}
    </>
  );
};

export default ChannelHeader;
