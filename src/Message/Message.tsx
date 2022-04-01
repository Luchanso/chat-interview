import { useReactiveVar } from "@apollo/client";
import { Box } from "rebass";
import { Msg } from "../Chat/Msg";
import { userState, useUserById } from "../chatState";
import { Container, ColorPlate, Avatar } from "./styled";

type Props = Msg & {
  fromMe: boolean;
};

const dateUtils = Intl.DateTimeFormat(navigator.language || "en-US", {
  timeStyle: "short",
  dateStyle: "short",
});

export function Message({ text, userId, datetime, error, isTemp }: Props) {
  const user = useUserById(userId);
  const currentUserId = useReactiveVar(userState);
  const isMe = currentUserId === user?.id;

  return (
    <Container isMe={isMe}>
      <ColorPlate isMe={isMe} isTemp={isTemp} isError={!!error}>
        <Box flexShrink={0}>
          <Avatar src={user?.avatar} />
        </Box>
        <Box mx={2} textAlign={isMe ? "right" : "left"}>
          <Box fontWeight="bold">{user?.name}</Box>
          <Box alignItems="center" fontSize={15}>
            {text}
          </Box>
          <Box fontSize={12} color="#00000066">
            {dateUtils.format(new Date(datetime))}
          </Box>
        </Box>
      </ColorPlate>
    </Container>
  );
}
