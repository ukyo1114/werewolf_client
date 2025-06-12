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
      border="4px solid #ccc"
      p={4}
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
          {title}
        </Text>
        <Flex gap={4} align="center">
          {children}
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
      </Flex>
    </Box>
  );
};

export default Header;
