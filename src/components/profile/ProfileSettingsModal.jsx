import { useState, useRef, useCallback } from "react";
import axios from "axios";

import {
  Stack,
  Button,
  FormControl,
  Checkbox,
  Input,
  Box,
  Image,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import ImageCropper from "../ImageCropper";
import { EllipsisText, CustomButton } from "../CustomComponents";

import { useUserState } from "../../context/UserProvider.jsx";
import useNotification from "../../commonHooks/useNotification";
import usePostDetails from "../../commonHooks/usePostDetails";

import { errors, messages } from "../../messages";
import { profileSettingsValidationSchema } from "./validationSchema";

const ProfileSettingsModal = ({ onClose }) => {
  const { user, uDispatch } = useUserState();
  const showToast = useNotification();
  const [cropImage, setCropImage] = useState(false);
  const [isPictureChanged, setIsPictureChanged] = useState(false);
  const [pic, setPic] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const inputRef = useRef();

  const postDetails = usePostDetails({
    setImgSrc,
    onOpen: () => setCropImage(true),
    inputRef,
  });

  const handleSubmit = useCallback(
    async (values, actions) => {
      const { userName, isUserNameChanged } = values;
      if (!isUserNameChanged && !isPictureChanged) return;
      actions.setSubmitting(true);
      const payload = {};
      if (isUserNameChanged && userName) payload.userName = userName;
      if (isPictureChanged && pic) payload.pic = pic;

      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        const { data } = await axios.put("/api/user/profile", payload, config);
        if (isUserNameChanged && userName) {
          uDispatch({ type: "CHANGE_NAME", payload: userName });
        }
        if (data.pic) {
          uDispatch({ type: "CHANGE_PIC", payload: data.pic });
        }

        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("userInfo")),
            userName: user.userName,
            pic: user.pic,
          })
        );

        showToast(messages.PROFILE_SETTINGS_CHANGED, "success");
      } catch (error) {
        showToast(
          error?.response?.data?.error || errors.PROFILE_SETTINGS_FAILED,
          "error"
        );
      } finally {
        actions.setSubmitting(false);
        onClose();
      }
    },
    [
      isPictureChanged,
      pic,
      user.token,
      uDispatch,
      showToast,
      onClose,
      user.userName,
      user.pic,
    ]
  );

  const handleImageClick = useCallback(() => {
    if (isPictureChanged) inputRef.current.click();
  }, [isPictureChanged]);

  return (
    <Stack w="100%" overflow="auto">
      <Box display={cropImage && "none"}>
        <Formik
          initialValues={{
            isUserNameChanged: false,
            userName: user.userName,
          }}
          validationSchema={profileSettingsValidationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <FormControl id="isUserNameChanged" mb={2}>
                <Field name="isUserNameChanged">
                  {({ field }) => (
                    <Checkbox {...field} isChecked={field.value}>
                      <EllipsisText>ユーザー名を変更する</EllipsisText>
                    </Checkbox>
                  )}
                </Field>
              </FormControl>

              <FormControl id="userName" mb={3}>
                <Field name="userName">
                  {({ field }) => (
                    <Input
                      {...field}
                      placeholder="ユーザー名"
                      autoComplete="off"
                      isDisabled={!formik.values.isUserNameChanged}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="userName"
                  component="div"
                  style={{ color: "red", fontSize: "smaller" }}
                />
              </FormControl>

              <FormControl id="isPictureChanged" mb={2}>
                <Checkbox
                  id="isPictureChanged"
                  isChecked={isPictureChanged}
                  onChange={(e) => setIsPictureChanged(e.target.checked)}
                >
                  <EllipsisText>プロフィール画像を変更する</EllipsisText>
                </Checkbox>
              </FormControl>

              <FormControl
                id="pic"
                display="flex"
                flexDirection="column"
                alignItems="center"
                mb={3}
              >
                {pic ? (
                  <Image
                    src={pic}
                    boxSize="120px"
                    borderRadius="lg"
                    objectFit="cover"
                    alt="プロフィール画像"
                    cursor={isPictureChanged ? "pointer" : "not-allowed"}
                    onClick={handleImageClick}
                    opacity={isPictureChanged ? 1 : 0.7}
                  />
                ) : (
                  <Button
                    isDisabled={!isPictureChanged}
                    width="120px"
                    height="120px"
                    borderRadius="lg"
                    onClick={() => inputRef.current.click()}
                    colorScheme="gray"
                  >
                    画像を選択
                  </Button>
                )}

                <Input
                  hidden
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={(e) => postDetails(e.target.files[0])}
                  ref={inputRef}
                />
              </FormControl>

              <CustomButton type="submit" isLoading={formik.isSubmitting}>
                送信
              </CustomButton>
            </Form>
          )}
        </Formik>
      </Box>

      {cropImage && (
        <ImageCropper
          imgSrc={imgSrc}
          setPic={setPic}
          onClose={() => setCropImage(false)}
        />
      )}
    </Stack>
  );
};

export default ProfileSettingsModal;
