import axios from "axios";
import SidebarTemp from "../SidebarTemp.jsx";
import { useDisclosure } from "@chakra-ui/react";

import {
  FaUsers,
  FaBinoculars,
  FaArrowLeft,
  FaSignOutAlt,
  FaCog,
  FaUserSlash,
  FaInfoCircle,
} from "react-icons/fa";

import { useUserState } from "../../../../context/UserProvider.jsx";
// import UserList from "../miscellaneous/UserList.jsx";
// import BlockModal from "./BlockModal.jsx";
// import ChannelSettingsModal from "./ChannelSettingsModal.jsx";
import useNotification from "../../../../commonHooks/useNotification";
import ModalTemplete from "../../../../components/ModalTemplete.jsx";
import {
  SidebarButton,
  iconProps,
} from "../../../../components/CustomComponents.jsx";
// import SpectatorModal from "./spectate/SpectatorModal.jsx";
// import { DisplayChDescription } from "../miscellaneous/DisplayChDescription.jsx";
import { messages } from "../../../../messages.js";

const ChannelSidebar = () => {
  const { user, currentChannel, chDispatch } = useUserState();
  const { _id: channelId, channelAdmin, users } = currentChannel;
  const isAdmin = channelAdmin === user.userId;
  const showToast = useNotification();

  const userListModal = useDisclosure();
  const blockModal = useDisclosure();
  const chSettingsModal = useDisclosure();
  const spectator = useDisclosure();
  const chDescription = useDisclosure();

  const leaveChannel = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`/api/channel/leave/${channelId}`, config);

      showToast(messages.LEFT_CHANNEL, "success");
      chDispatch({ type: "LEAVE_CHANNEL" });
    } catch (error) {
      showToast(error?.response?.data?.error, "error");
    }
  };

  return (
    <SidebarTemp>
      <SidebarButton
        label="チャンネル情報"
        onClick={chDescription.onOpen}
        leftIcon={<FaInfoCircle {...iconProps} />}
      ></SidebarButton>

      <SidebarButton
        label="ユーザーリスト"
        onClick={userListModal.onOpen}
        leftIcon={<FaUsers {...iconProps} />}
      ></SidebarButton>

      <SidebarButton
        label="観戦"
        onClick={spectator.onOpen}
        leftIcon={<FaBinoculars {...iconProps} />}
      ></SidebarButton>

      <SidebarButton
        label="戻る"
        onClick={() => chDispatch({ type: "LEAVE_CHANNEL" })}
        leftIcon={<FaArrowLeft {...iconProps} />}
      ></SidebarButton>

      <SidebarButton
        label="退出"
        onClick={() => leaveChannel()}
        isDisabled={isAdmin}
        leftIcon={<FaSignOutAlt {...iconProps} />}
      ></SidebarButton>

      <SidebarButton
        label="ブロック/解除"
        onClick={blockModal.onOpen}
        isDisabled={!isAdmin}
        leftIcon={<FaUserSlash {...iconProps} />}
      ></SidebarButton>

      <SidebarButton
        label="チャンネル設定"
        onClick={chSettingsModal.onOpen}
        isDisabled={!isAdmin}
        leftIcon={<FaCog {...iconProps} />}
      ></SidebarButton>

      {/*       <ModalTemplete
        isOpen={chDescription.isOpen}
        onClose={chDescription.onClose}
        title={"チャンネル情報"}
      >
        <DisplayChDescription />
      </ModalTemplete> */}

      {/*       <ModalTemplete
        isOpen={userListModal.isOpen}
        onClose={userListModal.onClose}
        title={"ユーザーリスト"}
      >
        <UserList userList={users} />
      </ModalTemplete> */}

      {/*       <ModalTemplete
        isOpen={spectator.isOpen}
        onClose={spectator.onClose}
        title={"ゲームリスト"}
      >
        <SpectatorModal />
      </ModalTemplete> */}

      {/*       {isAdmin && (
        <ModalTemplete
          isOpen={blockModal.isOpen}
          onClose={blockModal.onClose}
          title={"ブロック/解除"}
        >
          <BlockModal />
        </ModalTemplete>
      )} */}

      {/*       {isAdmin && (
        <ModalTemplete
          isOpen={chSettingsModal.isOpen}
          onClose={chSettingsModal.onClose}
          title={"チャンネル設定"}
        >
          <ChannelSettingsModal />
        </ModalTemplete>
      )} */}
    </SidebarTemp>
  );
};

export default ChannelSidebar;
