import { useCallback } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

import {
  Stack,
  FormControl,
  Checkbox,
  Input,
  Textarea,
  FormLabel,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Divider,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useUserState } from "../../context/UserProvider.jsx";
import useNotification from "../../hooks/useNotification";
import { errors, messages } from "../../messages";
import {
  createChValidationSchema,
  createChInitialValues,
} from "./validationSchema";
import { EllipsisText } from "../miscellaneous/CustomComponents.jsx";
import ModalButton from "../miscellaneous/ModalButton.jsx";

const CreateChannel = () => {
  const showToast = useNotification();
  const { user, chDispatch } = useUserState();

  const handleSubmit = useCallback(
    async (values, actions) => {
      const {
        channelName,
        description,
        password,
        isPasswordEnabled,
        denyGuests,
        numberOfPlayers,
      } = values;
      actions.setSubmitting(true);

      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const payload = {
          channelName,
          channelDescription: description,
          passwordEnabled: isPasswordEnabled,
          password: isPasswordEnabled ? password : null,
          denyGuests,
          numberOfPlayers,
        };

        const {
          data: { channel },
        } = await axios.post("/api/channel/create", payload, config);

        actions.setSubmitting(false);
        showToast(messages.CHANNEL_CREATED, "success");
        chDispatch({ type: "JOIN_CHANNEL", payload: channel });
      } catch (error) {
        const errorMessage =
          error?.response?.data?.error || errors.CHANNEL_CREATION_FAILED;
        showToast(errorMessage, "error");
        actions.setSubmitting(false);
      }
    },
    [chDispatch, showToast, user.token]
  );

  return (
    <Stack w="100%" overflow="hidden" spacing={6}>
      <Formik
        initialValues={createChInitialValues}
        validationSchema={createChValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <Box mb={4}>
              <FormControl id="channelName" mb={3}>
                <FormLabel fontWeight="bold">
                  <EllipsisText>チャンネル名</EllipsisText>
                </FormLabel>
                <Field name="channelName">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      placeholder="チャンネル名を入力してください"
                      autoComplete="off"
                      size="lg"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="channelName"
                  component="div"
                  style={{
                    color: "red",
                    fontSize: "smaller",
                    marginTop: "4px",
                  }}
                />
              </FormControl>

              <FormControl
                id="description"
                display="flex"
                flexDir="column"
                overflow="auto"
                mb={3}
              >
                <FormLabel fontWeight="bold">
                  <EllipsisText>説明文</EllipsisText>
                </FormLabel>
                <Field name="description">
                  {({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="チャンネルの説明を入力してください"
                      autoComplete="off"
                      resize="none"
                      as={TextareaAutosize}
                      size="lg"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="description"
                  component="div"
                  style={{
                    color: "red",
                    fontSize: "smaller",
                    marginTop: "4px",
                  }}
                />
              </FormControl>
            </Box>

            <Divider my={4} />

            <Box mb={4}>
              <FormControl id="numberOfPlayers" mb={4}>
                <FormLabel fontWeight="bold">
                  <EllipsisText>プレイヤー数</EllipsisText>
                </FormLabel>
                <Field name="numberOfPlayers">
                  {({ field }) => (
                    <NumberInput
                      {...field}
                      min={5}
                      max={20}
                      size="lg"
                      onChange={(value) =>
                        formik.setFieldValue("numberOfPlayers", parseInt(value))
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                </Field>
                <ErrorMessage
                  name="numberOfPlayers"
                  component="div"
                  style={{
                    color: "red",
                    fontSize: "smaller",
                    marginTop: "4px",
                  }}
                />
              </FormControl>

              <FormControl
                id="denyGuests"
                mb={4}
                display="flex"
                alignItems="center"
              >
                <FormLabel mb="0" fontWeight="bold">
                  <EllipsisText>
                    登録済みユーザーのみ入室を許可する
                  </EllipsisText>
                </FormLabel>
                <Field name="denyGuests">
                  {({ field }) => (
                    <Switch
                      {...field}
                      isChecked={field.value}
                      colorScheme="blue"
                      size="lg"
                    />
                  )}
                </Field>
              </FormControl>
            </Box>

            <Divider my={4} />

            <Box mb={4}>
              <FormControl id="isPasswordEnabled" mb={3}>
                <Field name="isPasswordEnabled">
                  {({ field }) => (
                    <Checkbox {...field} isChecked={field.value} size="lg">
                      <EllipsisText>パスワードを設定する</EllipsisText>
                    </Checkbox>
                  )}
                </Field>
              </FormControl>

              {formik.values.isPasswordEnabled && (
                <FormControl id="password" mb={3}>
                  <Field name="password">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="パスワードを入力してください"
                        autoComplete="off"
                        isDisabled={!formik.values.isPasswordEnabled}
                        size="lg"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{
                      color: "red",
                      fontSize: "smaller",
                      marginTop: "4px",
                    }}
                  />
                </FormControl>
              )}
            </Box>

            <ModalButton type="submit" isLoading={formik.isSubmitting}>
              作成
            </ModalButton>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default CreateChannel;
