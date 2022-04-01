import { useReactiveVar } from "@apollo/client";
import { useRef, useState } from "react";
import { Box, Flex } from "rebass";
import { useChannelName, userState } from "../chatState";
import { Message } from "../Message/Message";
import { Root, Title, AmazingButton, Input } from "./styled";
import { useMessages } from "./useMessages";

export function Chat() {
  const channelName = useChannelName();
  const userId = useReactiveVar(userState);
  const [inputVal, setInputVal] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>();
  const scrollToBottom = () =>
    messagesContainerRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  const { messages, loadPreviousMessages, loading, sendMessage } =
    useMessages(scrollToBottom);

  async function handleSend() {
    setInputVal("");
    await sendMessage(inputVal);
  }

  return (
    <Root>
      <Title p={2}>{channelName}</Title>
      <Flex flexDirection={"column"} overflowY="scroll" mb={2} flexGrow={1}>
        <Flex margin={2} justifyContent="center">
          <AmazingButton onClick={loadPreviousMessages}>
            Load previous
          </AmazingButton>
        </Flex>
        <Flex flexDirection="column-reverse" ref={messagesContainerRef}>
          {!loading &&
            messages.map((msg) => (
              <Message
                key={msg.messageId}
                {...msg}
                fromMe={msg.userId === userId}
              />
            ))}
        </Flex>
        <Box mx={2}>
          {loading ? "Loading... 🐢" : "Auto update every 3 seconds"}
        </Box>
      </Flex>
      <Flex>
        <Input
          value={inputVal}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          onChange={({ target: { value } }) => {
            setInputVal(value);
          }}
        />
        <AmazingButton onClick={handleSend}>Send</AmazingButton>
      </Flex>
    </Root>
  );
}
