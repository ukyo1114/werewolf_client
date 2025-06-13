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
  shadowProps,
} from "../../../components/CustomComponents";
import ModalTemplete from "../../../components/ModalTemplete";
import { useState } from "react";
import { useUserState } from "../../../context/UserProvider";
import { FaBars } from "react-icons/fa";

const Header = ({ children, title }) => {
  const { isMobile } = useUserState();

  return (
    <Box
      bgImage="url('/white-wood-texture3.jpg')"
      bgSize="cover"
      bgPosition="center"
      borderRadius="md"
      border="4px solid #b0b0b0"
      p={4}
      {...shadowProps}
      w="100%"
    >
      <Flex align="center" gap={4}>
        <Flex justify="space-between" align="center" flex={1}>
          {children}
        </Flex>
        {isMobile && (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaBars />}
              variant="ghost"
              size="sm"
            />
            <MenuList></MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
