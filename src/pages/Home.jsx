import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Container,
  Box,
  Image,
  Button,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Auth from "../components/home/Auth.jsx";
import { useUserState } from "../context/UserProvider.jsx";

const Home = () => {
  const { uDispatch, chDispatch } = useUserState();
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/chats");
    } else {
      uDispatch({ type: "LOGOUT" });
      chDispatch({ type: "LEAVE_CHANNEL" });
    }
  }, [navigate, uDispatch, chDispatch]);

  return (
    <Container gap={8} display="flex" centerContent maxW="xl">
      <VStack spacing={8} w="100%">
        <Image mt={8} w="300px" h="63px" src="/TITLE.webp" alt="10人で人狼" />
        <Box w="100%">
          <Auth />
        </Box>
        <Box textAlign="center">
          <Text color={textColor} mb={4}>
            初めての方はこちら
          </Text>
          <Button
            as={Link}
            to="/how-to-play"
            colorScheme="blue"
            variant="outline"
            size="lg"
          >
            はじめかたを見る
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Home;
