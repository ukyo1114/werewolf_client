import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Container,
  Heading,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import useNotification from "../commonHooks/useNotification";

const Register = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const showToast = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName) {
      newErrors.userName = "ユーザー名は必須です";
    } else if (formData.userName.length > 20) {
      newErrors.userName = "ユーザー名は20文字以内で入力してください";
    }

    if (!formData.password) {
      newErrors.password = "パスワードは必須です";
    } else if (formData.password.length < 8) {
      newErrors.password = "パスワードは8文字以上で入力してください";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "パスワードの確認は必須です";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!token) {
      showToast("無効なリンクです", "error");
      navigate("/");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await axios.post("/api/user/register", {
        token,
        userName: formData.userName,
        password: formData.password,
      });

      showToast("ユーザー登録が完了しました", "success");

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          ...data,
          userName: formData.userName,
          pic: null,
        })
      );
      navigate("/chats");
    } catch (error) {
      showToast(error.response?.data?.message || "登録に失敗しました", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6" align="center">
          <Heading size="lg" color="blue.600">
            ユーザー登録
          </Heading>
          <Text color="gray.600" textAlign="center">
            メールアドレスの確認が完了しました。ユーザー名とパスワードを設定してください。
          </Text>
        </Stack>

        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "white" }}
          boxShadow={{ base: "none", sm: "xl" }}
          borderRadius={{ base: "none", sm: "xl" }}
          borderWidth="1px"
          borderColor="gray.200"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing="6">
              <FormControl isRequired isInvalid={errors.userName}>
                <FormLabel fontWeight="bold">ユーザー名</FormLabel>
                <Input
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  type="text"
                  placeholder="ユーザー名を入力"
                  size="lg"
                  _hover={{ borderColor: "blue.400" }}
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                  }}
                />
                <Text mt={2} fontSize="sm" color="gray.600">
                  ゲームやチャットで表示される名前です。後から変更することもできます。
                </Text>
                <FormErrorMessage>{errors.userName}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.password}>
                <FormLabel fontWeight="bold">パスワード</FormLabel>
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="パスワードを入力"
                  size="lg"
                  _hover={{ borderColor: "blue.400" }}
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                  }}
                />
                <Text mt={2} fontSize="sm" color="gray.600">
                  8文字以上で入力してください。
                </Text>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.confirmPassword}>
                <FormLabel fontWeight="bold">パスワード（確認）</FormLabel>
                <Input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder="パスワードを再入力"
                  size="lg"
                  _hover={{ borderColor: "blue.400" }}
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
                  }}
                />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>

              <Alert status="info" borderRadius="md" mt={2}>
                <AlertIcon />
                <Box>
                  <AlertTitle>セキュリティについて</AlertTitle>
                  <AlertDescription>
                    パスワードは安全に保管され、他のユーザーに表示されることはありません。
                    定期的なパスワード変更をお勧めします。
                  </AlertDescription>
                </Box>
              </Alert>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                isLoading={isSubmitting}
                loadingText="登録中..."
                isDisabled={isSubmitting}
                width="100%"
                mt={4}
                _hover={{ transform: "translateY(-1px)", boxShadow: "lg" }}
                _active={{ transform: "translateY(0)" }}
              >
                登録
              </Button>
            </VStack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
