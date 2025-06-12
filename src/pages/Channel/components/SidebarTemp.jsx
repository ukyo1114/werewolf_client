import { Stack, Center } from "@chakra-ui/react";
// import ProfileMenu from "../profile/ProfileMenu.jsx";
import { useUserState } from "../../../context/UserProvider.jsx";

const SidebarTemp = ({ children }) => {
  return (
    <Stack
      p={4}
      alignItems="center"
      overflowY="auto"
      justifyContent="space-between"
      h="100%"
      maxW="300px"
      bg="rgba(255,255,255,0.5)"
      backdropFilter="blur(10px)"
      borderRadius="lg"
    >
      <Stack alignItems={{ base: "center", lg: "flex-start" }} w="100%" gap={4}>
        {children}
      </Stack>
      {/* 
      <Center mt="auto" mb={4} w="100%">
        <ProfileMenu />
      </Center> */}
    </Stack>
  );
};

export default SidebarTemp;
