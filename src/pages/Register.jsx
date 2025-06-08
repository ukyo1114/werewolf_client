import { useState } from "react";
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
  useToast,
  Container,
  Heading,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  userName: Yup.string()
    .required("ユーザー名は必須です")
    .min(3, "ユーザー名は3文字以上で入力してください")
    .max(20, "ユーザー名は20文字以内で入力してください"),
  password: Yup.string()
    .required("パスワードは必須です")
    .min(8, "パスワードは8文字以上で入力してください"),
  confirmPassword: Yup.string()
    .required("パスワードの確認は必須です")
    .oneOf([Yup.ref("password"), null], "パスワードが一致しません"),
});

const Register = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!token) {
      toast({
        title: "エラー",
        description: "無効なリンクです",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
      return;
    }

    setIsLoading(true);
    setSubmitting(true);

    try {
      const { data } = await axios.post("/api/user/register", {
        token,
        userName: values.userName,
        password: values.password,
      });

      toast({
        title: "登録完了",
        description: "ユーザー登録が完了しました",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          ...data,
          userName: values.userName,
          pic: null,
        })
      );
      navigate("/chats");
    } catch (error) {
      toast({
        title: "エラー",
        description: error.response?.data?.message || "登録に失敗しました",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
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
          <Formik
            initialValues={{
              userName: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <VStack spacing="6">
                  <FormControl
                    id="userName"
                    isRequired
                    isInvalid={errors.userName && touched.userName}
                  >
                    <FormLabel fontWeight="bold">ユーザー名</FormLabel>
                    <Field name="userName">
                      {({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="ユーザー名を入力"
                          size="lg"
                          _hover={{ borderColor: "blue.400" }}
                          _focus={{
                            borderColor: "blue.500",
                            boxShadow:
                              "0 0 0 1px var(--chakra-colors-blue-500)",
                          }}
                        />
                      )}
                    </Field>
                    <Text mt={2} fontSize="sm" color="gray.600">
                      ゲームやチャットで表示される名前です。後から変更することもできます。
                    </Text>
                    <ErrorMessage
                      name="userName"
                      component={Text}
                      style={{ color: "red.500", fontSize: "sm", mt: 1 }}
                    />
                  </FormControl>

                  <FormControl
                    id="password"
                    isRequired
                    isInvalid={errors.password && touched.password}
                  >
                    <FormLabel fontWeight="bold">パスワード</FormLabel>
                    <Field name="password">
                      {({ field }) => (
                        <Input
                          {...field}
                          type="password"
                          placeholder="パスワードを入力"
                          size="lg"
                          _hover={{ borderColor: "blue.400" }}
                          _focus={{
                            borderColor: "blue.500",
                            boxShadow:
                              "0 0 0 1px var(--chakra-colors-blue-500)",
                          }}
                        />
                      )}
                    </Field>
                    <Text mt={2} fontSize="sm" color="gray.600">
                      8文字以上で入力してください。
                    </Text>
                    <ErrorMessage
                      name="password"
                      component={Text}
                      style={{ color: "red.500", fontSize: "sm", mt: 1 }}
                    />
                  </FormControl>

                  <FormControl
                    id="confirmPassword"
                    isRequired
                    isInvalid={
                      errors.confirmPassword && touched.confirmPassword
                    }
                  >
                    <FormLabel fontWeight="bold">パスワード（確認）</FormLabel>
                    <Field name="confirmPassword">
                      {({ field }) => (
                        <Input
                          {...field}
                          type="password"
                          placeholder="パスワードを再入力"
                          size="lg"
                          _hover={{ borderColor: "blue.400" }}
                          _focus={{
                            borderColor: "blue.500",
                            boxShadow:
                              "0 0 0 1px var(--chakra-colors-blue-500)",
                          }}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="confirmPassword"
                      component={Text}
                      style={{ color: "red.500", fontSize: "sm", mt: 1 }}
                    />
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
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
