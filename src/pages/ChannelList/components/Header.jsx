// External libraries
import {
  Box,
  Text,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {
  EllipsisText,
  CustomButton,
} from "../../../components/CustomComponents";
import ModalTemplete from "../../../components/ModalTemplete";
import CreateChannel from "./CreateChannel";
import { useState } from "react";
import { useUserState } from "../../../context/UserProvider";
import { FaBars } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";

const Header = ({ showJoinedCh, setShowJoinedCh }) => {
  const { isMobile } = useUserState();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <Box
      bgImage="url('/white-wood-texture3.jpg')"
      bgSize="cover"
      bgPosition="center"
      borderRadius="md"
      p={4}
      my={4}
      boxShadow="lg"
      w="100%"
    >
      <Flex justify="space-between" align="center">
        <Text
          as="h2"
          fontSize={isMobile ? "xl" : "2xl"}
          fontWeight="bold"
          color="gray.800"
          letterSpacing="wider"
        >
          チャンネル一覧
        </Text>
        <Flex gap={4} align="center">
          <Checkbox
            id="isJoined"
            isChecked={showJoinedCh}
            onChange={(e) => setShowJoinedCh(e.target.checked)}
            borderColor="gray.500"
            _hover={{ borderColor: "gray.600" }}
          >
            <EllipsisText>参加中のみ</EllipsisText>
          </Checkbox>
          {isMobile ? (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FaBars />}
                variant="ghost"
                size="sm"
              />
              <MenuList>
                <MenuItem onClick={() => setIsOpen(true)}>
                  チャンネル作成
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <CustomButton
              onClick={() => setIsOpen(true)}
              leftIcon={<FaRegPlusSquare />}
            >
              チャンネル作成
            </CustomButton>
          )}
        </Flex>
      </Flex>
      <ModalTemplete title="チャンネル作成" isOpen={isOpen} onClose={onClose}>
        <CreateChannel onClose={onClose} />
      </ModalTemplete>
    </Box>
  );
};

export default Header;
