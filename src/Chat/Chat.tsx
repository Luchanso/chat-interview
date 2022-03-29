import { useReactiveVar } from "@apollo/client";
import { Textarea } from "@rebass/forms";
import { useState } from "react";
import { Box, Button, Flex } from "rebass";
import styled from "styled-components";
import { useChannelName, userState } from "../chatState";
import { Message } from "../Message/Message";

const Root = styled.div`
  height: 100%;
  flex-direction: column;
  display: flex;
`;

const Title = styled(Box)`
  border-bottom: 1px solid #e6ecf3;
`;

const Input = styled(Textarea)`
  border-radius: 4px;
  margin: 0 8px !important;
`;

const AmazingButton = styled(Button)`
  background-color: plum;
  color: black !important;
  cursor: pointer;

  :hover {
    background-color: #dda0ddcf;
  }

  :active {
    background-color: #a274a2;
  }
`;

export function Chat() {
  const channelName = useChannelName();
  const userId = useReactiveVar(userState);
  const [inputVal, setInputVal] = useState("");
  const messages = [
    {
      datetime: "2022-03-28T07:47:29.713Z",
      messageId: "4352954633381554659",
      text: "Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!",
      userId: "Sam",
    },
    {
      datetime: "2022-03-28T07:47:29.713Z",
      messageId: "4352954633381554659",
      text: "Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!",
      userId: "Sam",
    },
    {
      datetime: "2022-03-28T07:47:29.713Z",
      messageId: "4352954633381554659",
      text: "Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!",
      userId: "Sam",
    },
    {
      datetime: "2022-03-28T07:47:29.713Z",
      messageId: "4352954633381554659",
      text: "Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!",
      userId: "Sam",
    },
    {
      datetime: "2022-03-28T07:47:29.713Z",
      messageId: "4352954633381554659",
      text: "Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!",
      userId: "Sam",
    },
    {
      datetime: "2022-03-28T07:47:29.713Z",
      messageId: "4352954633381554659",
      text: "Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!Good Afternoon Joyse!",
      userId: "Sam",
    },
    {
      datetime: "2022-03-28T07:46:57.31Z",
      messageId: "4641048028065805651",
      text: "H",
      userId: "Joyse",
    },
    {
      datetime: "2022-03-28T07:46:57.31Z",
      messageId: "4641048d028065805651",
      text: "Hasdfij asldf a;sldj f;alsdj f;lasjdfl;ajsdf ;lajs;df ljasd fl",
      userId: "Joyse",
    },
  ];

  return (
    <Root>
      <Title p={2}>{channelName}</Title>
      <Box overflowY="scroll" mb={2}>
        <Flex margin={2} justifyContent="center">
          <AmazingButton>Load previous</AmazingButton>
        </Flex>
        {messages.map((msg) => (
          <Message
            key={msg.messageId}
            {...msg}
            fromMe={msg.userId === userId}
          />
        ))}
      </Box>
      <Flex>
        <Input
          value={inputVal}
          onChange={({ target: { value } }) => {
            setInputVal(value);
          }}
        />
        <AmazingButton
          onClick={() => {
            setInputVal("");
          }}
        >
          Send
        </AmazingButton>
      </Flex>
    </Root>
  );
}
