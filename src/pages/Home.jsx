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
  Heading,
  Icon,
  Divider,
  SimpleGrid,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaGamepad } from "react-icons/fa";
import { FaUsers, FaLock, FaXTwitter } from "react-icons/fa6";
import { useUserState } from "../context/UserProvider.jsx";
import GuestLoginButton from "../components/home/GuestLoginButton.jsx";

const Home = () => {
  const { uDispatch, chDispatch } = useUserState();
  const navigate = useNavigate();
  const textColor = useColorModeValue("gray.600", "gray.400");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const highlightColor = useColorModeValue("blue.500", "blue.300");

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/chats");
    } else {
      uDispatch({ type: "LOGOUT" });
      chDispatch({ type: "LEAVE_CHANNEL" });
    }
  }, [navigate, uDispatch, chDispatch]);

  const features = [
    {
      icon: FaGamepad,
      title: "簡単に始められる",
      description: "ゲストとしてすぐにプレイ可能",
    },
    {
      icon: FaUsers,
      title: "活発な交流",
      description: "チャットで戦略を練り、推理を楽しむ",
    },
    {
      icon: FaLock,
      title: "充実した機能",
      description: "役職の確認や投票など、便利な機能が満載",
    },
  ];

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh">
      <Container maxW="container.xl" py={10}>
        <VStack spacing={12} align="stretch">
          {/* ヘッダーセクション */}
          <VStack spacing={8} align="center" textAlign="center">
            <Image w="300px" h="63px" src="/TITLE.webp" alt="10人で人狼" />
            <Heading
              size="xl"
              bgGradient="linear(to-r, blue.400, blue.600)"
              bgClip="text"
              fontWeight="bold"
            >
              人狼ゲームで遊ぼう
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl">
              初めての方でも簡単に楽しめる人狼ゲーム。
              ゲストとしてすぐに始めたり、メンバー登録してより多くの機能を楽しんだりできます。
            </Text>
          </VStack>

          {/* 特徴セクション */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {features.map((feature, index) => (
              <Box
                key={index}
                p={6}
                bg={cardBg}
                rounded="xl"
                shadow="md"
                border="1px"
                borderColor={borderColor}
                textAlign="center"
                _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                transition="all 0.2s"
              >
                <Icon
                  as={feature.icon}
                  w={10}
                  h={10}
                  color={highlightColor}
                  mb={4}
                />
                <Heading size="md" mb={2}>
                  {feature.title}
                </Heading>
                <Text color={textColor}>{feature.description}</Text>
              </Box>
            ))}
          </SimpleGrid>

          {/* アクションセクション */}
          <Box
            p={8}
            bg={cardBg}
            rounded="xl"
            shadow="md"
            border="1px"
            borderColor={borderColor}
            textAlign="center"
          >
            <Heading size="md" mb={6} color={textColor}>
              ゲームを始める
            </Heading>
            <VStack spacing={6} align="stretch" maxW="md" mx="auto">
              <GuestLoginButton />

              <Divider />

              <Button
                as={Link}
                to="/login"
                colorScheme="blue"
                size="lg"
                h="60px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={3}
                _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                transition="all 0.2s"
              >
                <Icon as={FaSignInAlt} w={5} h={5} />
                <Text>ログイン</Text>
              </Button>

              <Button
                as={Link}
                to="/register"
                colorScheme="blue"
                variant="solid"
                size="lg"
                h="60px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={3}
                _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                transition="all 0.2s"
              >
                <Icon as={FaUserPlus} w={5} h={5} />
                <Text>ユーザー登録</Text>
              </Button>
            </VStack>
          </Box>

          {/* はじめかたセクション */}
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
              leftIcon={<Icon as={FaGamepad} />}
            >
              はじめかたを見る
            </Button>
          </Box>

          {/* ソーシャルリンクセクション */}
          <Box textAlign="center" pt={4}>
            <ChakraLink
              href="https://x.com/Ukyo219206"
              isExternal
              display="inline-flex"
              alignItems="center"
              color={textColor}
              _hover={{ color: "blue.500", textDecoration: "none" }}
              transition="all 0.2s"
            >
              <Icon as={FaXTwitter} w={5} h={5} mr={2} />
              <Text>Xでフォロー</Text>
            </ChakraLink>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
