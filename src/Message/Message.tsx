import { useReactiveVar } from "@apollo/client";
import { Box, Image } from "rebass";
import styled from "styled-components";
import { userState, useUserById } from "../chatState";

type Props = {
  datetime: string;
  messageId: string;
  text: string;
  userId: string;
  fromMe: boolean;
};

const Container = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: ${({ isMe }) => (isMe ? "row-reverse" : "row")};
  padding: 4px 8px;
`;

const ColorPlate = styled.div<{ isMe: boolean }>`
  padding: 8px;
  background-color: ${({ isMe }) => (isMe ? "plum" : "pink")};
  flex-direction: ${({ isMe }) => (isMe ? "row-reverse" : "row")};
  border-radius: 16px;
  max-width: 60%;
  display: flex;
  transition: 300ms;
`;

const Avatar = styled(Image)`
  border-radius: 16px;
  width: 48px;
  min-height: 48px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.33);
`;

const dateUtils = Intl.DateTimeFormat(navigator.language || "en-US", {
  timeStyle: 'short',
  dateStyle: 'short'
});

export function Message({ text, userId, datetime }: Props) {
  const user = useUserById(userId);
  const currentUserId = useReactiveVar(userState);
  const isMe = currentUserId === user?.id;

  return (
    <Container isMe={isMe}>
      <ColorPlate isMe={isMe}>
        <Box flexShrink={0}>
          <Avatar src={user?.avatar} />
        </Box>
        <Box mx={2} textAlign={isMe ? "right" : "left"}>
          <Box fontWeight="bold" >{user?.name}</Box>
          <Box
            alignItems="center"
            fontSize={15}
          >
            {text}
          </Box>
          <Box fontSize={12} color="#00000066">{dateUtils.format(new Date(datetime))}</Box>
        </Box>
      </ColorPlate>
    </Container>
  );
}
