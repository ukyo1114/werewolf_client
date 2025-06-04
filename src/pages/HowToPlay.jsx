import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  List,
  ListItem,
  ListIcon,
  Collapse,
  Button,
  Link,
} from "@chakra-ui/react";
import {
  FaUserFriends,
  FaUserSecret,
  FaClock,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaHome,
} from "react-icons/fa";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const HowToPlay = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const cardBg = useColorModeValue("white", "gray.800");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const steps = [
    {
      title: "1. アカウント作成またはゲストログイン",
      description:
        "新規の方はアカウントを作成、またはゲストとしてログインできます。",
      icon: FaUserFriends,
      content: (
        <VStack spacing={6} align="stretch" mt={4}>
          <Box>
            <Heading size="md" mb={4}>
              ゲストモードとメンバーの違い
            </Heading>
            <Text color={textColor} mb={4}>
              どちらのモードでも無料でプレイできます。メンバーになると、より多くの機能が利用可能になります。
            </Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>機能</Th>
                  <Th isNumeric>ゲスト</Th>
                  <Th isNumeric>メンバー</Th>
                </Tr>
              </Thead>
              <Tbody>
                {[
                  {
                    feature: "完全無料",
                    guest: true,
                    registered: true,
                  },
                  {
                    feature: "チャンネル作成",
                    guest: false,
                    registered: true,
                  },
                  {
                    feature: "ゲスト禁止チャンネルへの入室",
                    guest: false,
                    registered: true,
                  },
                ].map((type, index) => (
                  <Tr key={index}>
                    <Td>{type.feature}</Td>
                    <Td isNumeric>
                      {type.guest ? (
                        <Icon as={FaCheck} color="green.500" />
                      ) : (
                        <Icon as={FaTimes} color="red.500" />
                      )}
                    </Td>
                    <Td isNumeric>
                      {type.registered ? (
                        <Icon as={FaCheck} color="green.500" />
                      ) : (
                        <Icon as={FaTimes} color="red.500" />
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Box>
            <Heading size="md" mb={4}>
              アカウント作成の流れ
            </Heading>
            <List spacing={3}>
              {[
                "メールアドレスを入力して送信",
                "確認メールが届くまでお待ちください",
                "メール内のリンクをクリックしてアカウント作成ページへ",
                "パスワードとユーザー名を設定して完了",
              ].map((step, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaInfoCircle} color="blue.500" />
                  {step}
                </ListItem>
              ))}
            </List>
            <Text mt={4} color={textColor}>
              ※ アカウント作成は完全無料です。課金要素は一切ありません。
            </Text>
          </Box>
        </VStack>
      ),
    },
    {
      title: "2. チャンネル入室",
      description: "チャンネルを作成したり、チャンネルを探したりできます。",
      icon: FaUserSecret,
      content: (
        <VStack spacing={6} align="stretch" mt={4}>
          <Box>
            <Heading size="md" mb={4}>
              チャンネル入室の流れ
            </Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                チャンネル一覧から入室したいチャンネルを選択
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                チャンネルの詳細情報を確認（プレイヤー数、ルール設定など）
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                入室ボタンをクリック
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                パスワードが設定されている場合は入力が必要
              </ListItem>
            </List>
            <Text mt={4} color={textColor}>
              ※
              ゲストモードの場合は、ゲスト入室を許可しているチャンネルのみ入室可能です。
            </Text>
          </Box>

          <Box>
            <Heading size="md" mb={4}>
              チャンネル作成（メンバーのみ）
            </Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                チャンネル名を設定
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                ゲストの入室を許可するか選択
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                チャンネルの説明を追加（任意）
              </ListItem>
            </List>
          </Box>
        </VStack>
      ),
    },
    {
      title: "3. ゲーム開始までの流れ",
      description: "チャンネルに入室したら、ゲーム開始までの準備をしましょう。",
      icon: FaClock,
      content: (
        <VStack spacing={6} align="stretch" mt={4}>
          <Box>
            <Heading size="md" mb={4}>
              エントリー手順
            </Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                チャンネル内の「エントリー」ボタンをクリック
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                エントリーすると、プレイヤーリストに表示されます
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                現在のエントリー数が表示されているので、ゲーム開始まであと何人必要か確認できます
              </ListItem>
            </List>
          </Box>

          <Box>
            <Heading size="md" mb={4}>
              ゲーム開始
            </Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                必要な人数が集まると自動的にゲームが開始されます
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                ゲーム開始まで待機中は、チャットで他のプレイヤーと会話できます
              </ListItem>
              <ListItem>
                <ListIcon as={FaInfoCircle} color="blue.500" />
                エントリーをキャンセルする場合は、再度エントリーボタンをクリックしてください
              </ListItem>
            </List>
          </Box>
        </VStack>
      ),
    },
  ];

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={10} align="stretch">
          <Box textAlign="center" mb={8} position="relative">
            <Link
              as={RouterLink}
              to="/"
              position="absolute"
              left={0}
              top="50%"
              transform="translateY(-50%)"
              display="flex"
              alignItems="center"
              color="blue.500"
              _hover={{ textDecoration: "none", color: "blue.600" }}
            >
              <Icon as={FaHome} mr={2} />
              トップページへ戻る
            </Link>
            <Heading as="h1" size="2xl" mb={4}>
              人狼ゲームのはじめかた
            </Heading>
            <Text fontSize="xl" color={textColor}>
              初めての方でも簡単に楽しめる人狼ゲームの遊び方をご紹介します
            </Text>
          </Box>

          <VStack spacing={8} align="stretch">
            {steps.map((step, index) => (
              <Box
                key={index}
                p={6}
                bg={cardBg}
                rounded="xl"
                shadow="md"
                _hover={{ shadow: "lg" }}
                transition="all 0.3s"
              >
                <Button
                  variant="ghost"
                  w="100%"
                  h="auto"
                  p={0}
                  onClick={() => {
                    if (index === 0) setIsOpen(!isOpen);
                    if (index === 1) setIsOpen2(!isOpen2);
                    if (index === 2) setIsOpen3(!isOpen3);
                  }}
                  _hover={{ bg: "transparent" }}
                >
                  <HStack spacing={4} w="100%" justify="space-between">
                    <HStack spacing={4}>
                      <Icon as={step.icon} w={8} h={8} color="blue.500" />
                      <VStack align="start" spacing={2}>
                        <Heading size="md">{step.title}</Heading>
                        <Text color={textColor}>{step.description}</Text>
                      </VStack>
                    </HStack>
                    {(index === 0 || index === 1 || index === 2) && (
                      <Icon
                        as={
                          index === 0
                            ? isOpen
                              ? FaChevronUp
                              : FaChevronDown
                            : index === 1
                              ? isOpen2
                                ? FaChevronUp
                                : FaChevronDown
                              : isOpen3
                                ? FaChevronUp
                                : FaChevronDown
                        }
                        color="blue.500"
                      />
                    )}
                  </HStack>
                </Button>
                {index === 0 && (
                  <Collapse in={isOpen} animateOpacity>
                    {step.content}
                  </Collapse>
                )}
                {index === 1 && (
                  <Collapse in={isOpen2} animateOpacity>
                    {step.content}
                  </Collapse>
                )}
                {index === 2 && (
                  <Collapse in={isOpen3} animateOpacity>
                    {step.content}
                  </Collapse>
                )}
              </Box>
            ))}
          </VStack>

          <Box mt={8} p={6} bg={cardBg} rounded="xl" shadow="md">
            <Heading size="md" mb={4}>
              基本的な役職
            </Heading>
            <VStack align="start" spacing={4}>
              <Text>
                <Text as="span" fontWeight="bold">
                  村人：
                </Text>
                人狼を見つけ出し、処刑するのが目的です。
              </Text>
              <Text>
                <Text as="span" fontWeight="bold">
                  人狼：
                </Text>
                夜の間に村人を襲撃し、村人陣営の人数を減らすのが目的です。
              </Text>
              <Text>
                <Text as="span" fontWeight="bold">
                  占い師：
                </Text>
                夜の間に1人を選んで、その人が人狼かどうかを占うことができます。
              </Text>
              <Text>
                <Text as="span" fontWeight="bold">
                  霊能者：
                </Text>
                処刑された人が人狼だったかどうかを知ることができます。
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default HowToPlay;
