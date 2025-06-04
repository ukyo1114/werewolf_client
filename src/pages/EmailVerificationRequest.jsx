import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";

const EmailVerificationRequest = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const textColor = useColorModeValue("gray.600", "gray.400");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("/api/users/verify-email", { email });
      toast({
        title: "確認メールを送信しました",
        description: "メールに記載されたリンクから登録を完了してください。",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
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
          <VStack spacing={6} align="stretch">
            <Heading size="lg" textAlign="center">
              メールアドレスの確認
            </Heading>
            <Text color={textColor} textAlign="center">
              登録するメールアドレスを入力してください。
              確認メールをお送りします。
            </Text>

            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel>メールアドレス</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@example.com"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  isLoading={isLoading}
                  loadingText="送信中..."
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

export default EmailVerificationRequest;
