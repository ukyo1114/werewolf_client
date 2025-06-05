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
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

const ResetForm = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState("");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const iconColor = useColorModeValue("blue.500", "blue.300");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={10}>
      <Container maxW="container.sm">
        <Box
          p={8}
          bg={cardBg}
          rounded="xl"
          shadow="lg"
          border="1px"
          borderColor={borderColor}
          _hover={{ shadow: "xl" }}
          transition="all 0.3s"
        >
          <VStack spacing={8} align="stretch">
            <VStack spacing={3}>
              <Heading
                size="lg"
                textAlign="center"
                bgGradient="linear(to-r, blue.400, blue.600)"
                bgClip="text"
              >
                パスワード再設定
              </Heading>
              <Text color={textColor} textAlign="center" fontSize="md">
                登録したメールアドレスを入力してください。
                <br />
                パスワード再設定用のメールをお送りします。
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
                  パスワード再設定の流れ
                </Heading>
                <VStack spacing={2} align="stretch">
                  <Text fontSize="sm" color={textColor}>
                    1. メールアドレスを入力して再設定用メールを送信
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    2. 届いたメールのリンクをクリック
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    3. 新しいパスワードを設定
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    4. ログインして完了
                  </Text>
                </VStack>
              </VStack>
            </Box>

            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel fontWeight="medium">メールアドレス</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaEnvelope color={iconColor} />
                    </InputLeftElement>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@example.com"
                      size="lg"
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                      }}
                    />
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="full"
                  size="lg"
                  isLoading={isLoading}
                  _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                  transition="all 0.2s"
                >
                  メールを送信
                </Button>
              </VStack>
            </form>

            <Button
              as={Link}
              to="/login"
              variant="ghost"
              leftIcon={<FaArrowLeft />}
              size="sm"
              alignSelf="center"
            >
              ログインページに戻る
            </Button>
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
                <Heading size="lg">メールを送信しました</Heading>
                <Text color={textColor} maxW="md">
                  入力されたメールアドレス（{email}
                  ）にパスワード再設定用のメールを送信しました。
                  メールに記載されたリンクからパスワードの再設定を行ってください。
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

            <Button
              as={Link}
              to="/login"
              colorScheme="blue"
              size="lg"
              width="full"
              _hover={{
                transform: "translateY(-1px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
            >
              ログインページに戻る
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

const RequestPasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const toast = useToast();

  const handleSubmit = async (email) => {
    try {
      setIsLoading(true);
      await axios.post("/api/users/request-password-reset", { email });
      setSubmittedEmail(email);
      setIsSuccess(true);
    } catch (error) {
      toast({
        title: "メールの送信に失敗しました",
        description:
          error.response?.data?.message ||
          "しばらく経ってから再度お試しください。",
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
    <ResetForm onSubmit={handleSubmit} isLoading={isLoading} />
  );
};

export default RequestPasswordReset;
