import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  useColorModeValue,
  Icon,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaCheckCircle, FaHome } from "react-icons/fa";

const EmailForm = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, confirmEmail);
  };

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={10}>
      <Container maxW="container.sm">
        <Box
          p={8}
          bg={cardBg}
          rounded="xl"
          shadow="md"
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={8} align="stretch">
            <VStack spacing={4} align="center">
              <Heading size="lg" textAlign="center">
                メールアドレスの確認
              </Heading>
              <Text color={textColor} textAlign="center" maxW="md">
                登録するメールアドレスを入力してください。
                確認メールをお送りします。
              </Text>
            </VStack>

            <Box
              p={6}
              bg={useColorModeValue("blue.50", "blue.900")}
              rounded="lg"
              border="1px"
              borderColor={useColorModeValue("blue.200", "blue.700")}
            >
              <VStack spacing={4} align="stretch">
                <Heading
                  size="sm"
                  color={useColorModeValue("blue.600", "blue.300")}
                >
                  登録の流れ
                </Heading>
                <VStack spacing={2} align="stretch">
                  <Text fontSize="sm" color={textColor}>
                    1. メールアドレスを入力して確認メールを送信
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    2. 届いたメールのリンクをクリック
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    3. ユーザー名とパスワードを設定
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    4. 登録完了
                  </Text>
                </VStack>
              </VStack>
            </Box>

            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel fontWeight="medium">メールアドレス</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@example.com"
                    autoComplete="email"
                    size="lg"
                    _focus={{
                      borderColor: "blue.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
                    }}
                  />
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={email !== confirmEmail && confirmEmail !== ""}
                >
                  <FormLabel fontWeight="medium">
                    メールアドレス（確認）
                  </FormLabel>
                  <Input
                    type="email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder="example@example.com"
                    autoComplete="email"
                    size="lg"
                    _focus={{
                      borderColor: "blue.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
                    }}
                  />
                  {email !== confirmEmail && confirmEmail !== "" && (
                    <FormErrorMessage>
                      メールアドレスが一致しません
                    </FormErrorMessage>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  isLoading={isLoading}
                  loadingText="送信中..."
                  isDisabled={email !== confirmEmail || !email || !confirmEmail}
                  mt={2}
                >
                  確認メールを送信
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

const SuccessView = ({ email }) => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const successColor = useColorModeValue("green.500", "green.300");
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.sm">
        <Box
          p={8}
          bg={cardBg}
          rounded="xl"
          shadow="md"
          border="1px"
          borderColor={borderColor}
          textAlign="center"
        >
          <VStack spacing={8} align="stretch">
            <VStack spacing={6}>
              <Icon as={FaCheckCircle} w={20} h={20} color={successColor} />
              <VStack spacing={4}>
                <Heading size="lg">確認メールを送信しました</Heading>
                <Text color={textColor} maxW="md">
                  入力されたメールアドレス（{email}
                  ）に確認メールを送信しました。
                  メールに記載されたリンクから登録を完了してください。
                </Text>
              </VStack>
            </VStack>

            <Box
              p={6}
              bg={useColorModeValue("orange.50", "orange.900")}
              rounded="lg"
              border="1px"
              borderColor={useColorModeValue("orange.200", "orange.700")}
              textAlign="left"
            >
              <VStack spacing={4} align="stretch">
                <Heading
                  size="sm"
                  color={useColorModeValue("orange.600", "orange.300")}
                >
                  メールが届かない場合
                </Heading>
                <VStack spacing={3} align="stretch">
                  <Text fontSize="sm" color={textColor}>
                    • 迷惑メールフォルダをご確認ください
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    • メールアドレスが正しいかご確認ください
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    •
                    数分待っても届かない場合は、再度メールアドレスを入力してください
                  </Text>
                </VStack>
              </VStack>
            </Box>

            <VStack spacing={4} w="full">
              <Button
                as={Link}
                to="/"
                leftIcon={<Icon as={FaHome} />}
                colorScheme="blue"
                size="lg"
                width="full"
                _hover={{
                  transform: "translateY(-1px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
              >
                トップページへ戻る
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

const EmailVerificationRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const toast = useToast();

  const handleSubmit = async (email, confirmEmail) => {
    if (email !== confirmEmail) {
      toast({
        title: "メールアドレスが一致しません",
        description: "入力されたメールアドレスを確認してください。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      setIsLoading(true);
      await axios.post("/api/users/verify-email", { email });
      setSubmittedEmail(email);
      setIsSuccess(true);
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description:
          error.response?.data?.message || "メールの送信に失敗しました。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return isSuccess ? (
    <SuccessView email={submittedEmail} />
  ) : (
    <EmailForm onSubmit={handleSubmit} isLoading={isLoading} />
  );
};

export default EmailVerificationRequest;
