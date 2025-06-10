import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Flex,
  VStack,
  Image,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useUserState } from "../../context/UserProvider.jsx";
import GuestLoginButton from "./GuestLoginButton.jsx";
import { FaBook } from "react-icons/fa";

const TITLE_LOGO = "/TITLE.webp"; // 必要に応じてパスを修正
const DESCRIPTION =
  "初めての方でも簡単に楽しめる人狼ゲーム。ゲストとしてすぐに始めたり、メンバー登録してより多くの機能を楽しんだりできます。";
const BG_IMAGE = "/Village-entrance-pixel-art1.jpg";

const Home = () => {
  const { uDispatch, chDispatch } = useUserState();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    uDispatch({ type: "LOGOUT" });
    chDispatch({ type: "LEAVE_CHANNEL" });
  }, [uDispatch, chDispatch]);

  // 操作系ボタン群（横並び用）
  const actionButtonsRow = (
    <Flex gap={4}>
      <GuestLoginButton h="60px" fontSize="lg" />
      <Button
        colorScheme="blue"
        size="lg"
        h="60px"
        onClick={() => {
          const userInfo = localStorage.getItem("userInfo");
          if (userInfo) {
            navigate("/chats");
          } else {
            navigate("/login");
          }
        }}
      >
        ログイン
      </Button>
      <Button
        as={Link}
        to="/send-registration-email"
        colorScheme="blue"
        variant="solid"
        size="lg"
        h="60px"
      >
        ユーザー登録
      </Button>
      <Button
        as={Link}
        to="/how-to-play"
        colorScheme="blue"
        variant="outline"
        size="lg"
        h="60px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        _hover={{ transform: "translateY(-2px)", shadow: "md" }}
        transition="all 0.2s"
        leftIcon={<FaBook />}
      >
        あそびかた
      </Button>
    </Flex>
  );

  // タイトルロゴと説明文
  const logoAndDesc = (
    <VStack spacing={4} align={{ base: "center", md: "flex-start" }} w="100%">
      <Image
        src={TITLE_LOGO}
        alt="タイトルロゴ"
        w={{ base: "220px", md: "260px" }}
      />
      <Text fontSize={{ base: "md", md: "lg" }} color="gray.700" maxW="360px">
        {DESCRIPTION}
      </Text>
    </VStack>
  );

  if (isMobile) {
    // モバイル表示: 縦並び
    return (
      <VStack minH="100vh" spacing={8} py={8} px={4} bg="gray.50">
        <Image
          src={BG_IMAGE}
          alt="village entrance"
          maxW="100%"
          borderRadius="xl"
          shadow="2xl"
          objectFit="cover"
        />
        <Image src={TITLE_LOGO} alt="タイトルロゴ" w="220px" />
        <Text fontSize="md" color="gray.700" textAlign="center">
          {DESCRIPTION}
        </Text>
        <VStack spacing={6} w="100%">
          <GuestLoginButton w="100%" h="60px" fontSize="lg" />
          <Button
            colorScheme="blue"
            size="lg"
            w="100%"
            h="60px"
            onClick={() => {
              const userInfo = localStorage.getItem("userInfo");
              if (userInfo) {
                navigate("/chats");
              } else {
                navigate("/login");
              }
            }}
          >
            ログイン
          </Button>
          <Button
            as={Link}
            to="/send-registration-email"
            colorScheme="blue"
            variant="solid"
            size="lg"
            w="100%"
            h="60px"
          >
            ユーザー登録
          </Button>
          <Button
            as={Link}
            to="/how-to-play"
            colorScheme="blue"
            variant="outline"
            size="lg"
            w="100%"
            h="60px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={3}
            _hover={{ transform: "translateY(-2px)", shadow: "md" }}
            transition="all 0.2s"
            leftIcon={<FaBook />}
          >
            あそびかた
          </Button>
        </VStack>
      </VStack>
    );
  }

  // デスクトップ表示: タイトル・説明文を右上、ボタン群を下部中央に横並び
  return (
    <Flex
      minH="100vh"
      bgImage={`url(${BG_IMAGE})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      position="relative"
    >
      {/* 右上: タイトル・説明文（オーバーレイ付き） */}
      <Box
        position="absolute"
        top={8}
        left="50%"
        transform="translateX(-50%)"
        bg="rgba(255,255,255,0.85)"
        borderRadius="xl"
        boxShadow="lg"
        p={8}
        maxW="400px"
        zIndex={1}
      >
        {logoAndDesc}
      </Box>
      {/* 下部中央: ボタン群（横並び、オーバーレイ付き） */}
      <Flex
        position="absolute"
        bottom={8}
        left={0}
        right={0}
        justify="center"
        zIndex={1}
      >
        <Box bg="rgba(255,255,255,0.85)" borderRadius="xl" boxShadow="lg" p={4}>
          {actionButtonsRow}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;
