import { useState } from "react";
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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useUserState } from "../../../context/UserProvider.jsx";
import useNotification from "../../../commonHooks/useNotification";
import { errors, messages } from "../../../messages";
import {
  EllipsisText,
  CustomButton,
  formProps,
} from "../../../components//CustomComponents.jsx";
import { FaTimesCircle } from "react-icons/fa";

const initialState = {
  channelName: "",
  description: "",
  numberOfPlayers: 10,
  denyGuests: false,
  isPasswordEnabled: false,
  password: "",
};

const CreateChannel = ({ onClose }) => {
  const showToast = useNotification();
  const { user, chDispatch } = useUserState();
  const [values, setValues] = useState(initialState);
  const [errorsState, setErrorsState] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (vals) => {
    const errs = {};
    if (!vals.channelName || vals.channelName.length < 2) {
      errs.channelName = "2文字以上で入力してください";
    }
    if (!vals.description || vals.description.length < 2) {
      errs.description = "2文字以上で入力してください";
    }
    if (
      !vals.numberOfPlayers ||
      vals.numberOfPlayers < 5 ||
      vals.numberOfPlayers > 20
    ) {
      errs.numberOfPlayers = "5～20人で指定してください";
    }
    if (
      vals.isPasswordEnabled &&
      (!vals.password || vals.password.length < 8)
    ) {
      errs.password = "8文字以上のパスワードを入力してください";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNumberChange = (value) => {
    setValues((prev) => ({ ...prev, numberOfPlayers: parseInt(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrorsState(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setIsSubmitting(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const payload = {
        channelName: values.channelName,
        channelDescription: values.description,
        passwordEnabled: values.isPasswordEnabled,
        password: values.isPasswordEnabled ? values.password : null,
        denyGuests: values.denyGuests,
        numberOfPlayers: values.numberOfPlayers,
      };
      const {
        data: { channel },
      } = await axios.post("/api/channel/create", payload, config);
      showToast(messages.CHANNEL_CREATED, "success");
      chDispatch({ type: "JOIN_CHANNEL", payload: channel });
      setIsSubmitting(false);
      if (onClose) onClose();
      setValues(initialState);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || errors.CHANNEL_CREATION_FAILED;
      showToast(errorMessage, "error");
      setIsSubmitting(false);
    }
  };

  return (
    <Stack w="100%" overflow="hidden" spacing={6}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", overflow: "auto" }}
      >
        <Box mb={6}>
          <FormControl
            id="channelName"
            mb={5}
            isInvalid={!!errorsState.channelName}
          >
            <FormLabel fontWeight="bold">
              <EllipsisText>チャンネル名</EllipsisText>
            </FormLabel>
            <Input
              name="channelName"
              type="text"
              placeholder="チャンネル名を入力してください"
              autoComplete="off"
              size="lg"
              value={values.channelName}
              onChange={handleChange}
              {...formProps}
            />
            <FormErrorMessage>
              {!!errorsState.channelName && (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <FaTimesCircle style={{ marginRight: 6, color: "#E53E3E" }} />
                  {errorsState.channelName}
                </span>
              )}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="description"
            mb={5}
            isInvalid={!!errorsState.description}
          >
            <FormLabel fontWeight="bold">
              <EllipsisText>説明文</EllipsisText>
            </FormLabel>
            <Textarea
              name="description"
              placeholder="チャンネルの説明を入力してください"
              autoComplete="off"
              resize="none"
              as={TextareaAutosize}
              size="lg"
              maxH="250px"
              value={values.description}
              onChange={handleChange}
              {...formProps}
            />
            <FormErrorMessage>
              {!!errorsState.description && (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <FaTimesCircle style={{ marginRight: 6, color: "#E53E3E" }} />
                  {errorsState.description}
                </span>
              )}
            </FormErrorMessage>
          </FormControl>
        </Box>

        <Divider my={6} borderColor="gray.500" />

        <Box mb={6}>
          <FormControl
            id="numberOfPlayers"
            mb={5}
            isInvalid={!!errorsState.numberOfPlayers}
          >
            <FormLabel fontWeight="bold">
              <EllipsisText>プレイ人数</EllipsisText>
            </FormLabel>
            <NumberInput
              min={5}
              max={20}
              size="lg"
              value={values.numberOfPlayers}
              onChange={handleNumberChange}
            >
              <NumberInputField {...formProps} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>
              {!!errorsState.numberOfPlayers && (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <FaTimesCircle style={{ marginRight: 6, color: "#E53E3E" }} />
                  {errorsState.numberOfPlayers}
                </span>
              )}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="denyGuests"
            mb={5}
            display="flex"
            alignItems="center"
          >
            <FormLabel mb="0" fontWeight="bold">
              <EllipsisText>ゲスト入室不可</EllipsisText>
            </FormLabel>
            <Switch
              name="denyGuests"
              isChecked={values.denyGuests}
              onChange={handleChange}
              colorScheme="blue"
              size="lg"
            />
          </FormControl>
        </Box>

        <Divider my={6} borderColor="gray.500" />

        <Box mb={6}>
          <FormControl id="isPasswordEnabled" mb={5}>
            <Checkbox
              name="isPasswordEnabled"
              isChecked={values.isPasswordEnabled}
              onChange={handleChange}
              size="lg"
              borderColor="gray.500"
              _hover={{ borderColor: "gray.600" }}
            >
              <EllipsisText>パスワードを設定する</EllipsisText>
            </Checkbox>
          </FormControl>

          {values.isPasswordEnabled && (
            <FormControl
              id="password"
              mb={5}
              isInvalid={!!errorsState.password}
            >
              <Input
                name="password"
                type="text"
                placeholder="パスワードを入力してください"
                autoComplete="off"
                isDisabled={!values.isPasswordEnabled}
                size="lg"
                value={values.password}
                onChange={handleChange}
                {...formProps}
              />
              <FormErrorMessage>
                {!!errorsState.password && (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <FaTimesCircle
                      style={{ marginRight: 6, color: "#E53E3E" }}
                    />
                    {errorsState.password}
                  </span>
                )}
              </FormErrorMessage>
            </FormControl>
          )}
        </Box>

        <CustomButton type="submit" isLoading={isSubmitting} mt={6}>
          作成
        </CustomButton>
      </form>
    </Stack>
  );
};

export default CreateChannel;
