import {
  useLazyQuery,
  useMutation,
  useReactiveVar
} from "@apollo/client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { channelState, userState } from "../chatState";
import {
  ArgsFetchMoreMessages,
  FETCH_MORE_MESSAGES,
  ResultFetchMoreMessages
} from "../graphql/fetchMoreMessages";
import {
  ArgsFetchLatestMessages,
  FETCH_LATEST_MESSAGES,
  ResultFetchLatestMessages
} from "../graphql/fetchLatestMessages";
import {
  ArgsPostMessage,
  POST_MESSAGE,
  ResultPostMessage
} from "../graphql/postMessage";
import { Msg } from "./Msg";

function arrayMsgToMap(msgs: Msg[]): Record<string, Msg> {
  const newMessages: Record<string, Msg> = {};
  for (let i = 0; i < msgs.length; i++) {
    const msg = msgs[i];
    newMessages[msg.messageId] = msg;
  }
  return newMessages;
}

export function useMessages(scrollToBottom: () => void) {
  const [messagesMap, setMessagesMap] = useState<Record<string, Msg>>({});
  const lastMessageId = useRef<string | undefined>(undefined);
  const userId = useReactiveVar(userState);
  const channelId = useReactiveVar(channelState);
  const lastChannelId = useRef<string | undefined>(undefined);
  const [fetchLatest, { loading }] = useLazyQuery<
    ResultFetchLatestMessages,
    ArgsFetchLatestMessages
  >(FETCH_LATEST_MESSAGES);
  const [fetchMoreMsgs] = useLazyQuery<
    ResultFetchMoreMessages,
    ArgsFetchMoreMessages
  >(FETCH_MORE_MESSAGES);
  const [postMessage] = useMutation<ResultPostMessage, ArgsPostMessage>(
    POST_MESSAGE
  );

  function mergeMessages(newMessages: Record<string, Msg>, reverse = false) {
    setMessagesMap((prev) => {
      if (reverse) {
        return {
          ...newMessages,
          ...prev,
        };
      }

      return {
        ...prev,
        ...newMessages,
      };
    });
  }

  const updateChannelMessages = useCallback(
    async function updateChannelMessages() {
      if (channelId === undefined) {
        return;
      }
      const { data } = await fetchLatest({
        variables: {
          channelId,
        },
      });

      const latestMessages = data?.fetchLatestMessages || [];
      const newMessages = arrayMsgToMap(latestMessages);
      mergeMessages(newMessages, true);
    },
    [channelId, fetchLatest]
  );

  async function switchChannelMessages() {
    if (channelId === undefined) {
      return;
    }

    const { data } = await fetchLatest({
      variables: {
        channelId,
      },
    });
    const latestMessages = data?.fetchLatestMessages || [];
    const newMessages = arrayMsgToMap(latestMessages);
    lastMessageId.current =
      latestMessages[latestMessages.length - 1]?.messageId || "";
    setMessagesMap(newMessages);
  }

  async function loadPreviousMessages() {
    if (!channelId || !lastMessageId.current) {
      return;
    }

    const { data } = await fetchMoreMsgs({
      variables: {
        channelId,
        messageId: lastMessageId.current,
        old: true,
      },
    });
    const olderMessages = data?.fetchMoreMessages || [];
    const newMessages = arrayMsgToMap(olderMessages);
    lastMessageId.current =
      olderMessages[olderMessages.length - 1]?.messageId ||
      lastMessageId.current;
    mergeMessages(newMessages);
  }

  async function sendMessage(text: string) {
    if (!channelId || !userId) {
      return;
    }
    const tempId = "temp" + new Date().getTime().toString();

    const newMsg = {
      datetime: new Date().toISOString(),
      messageId: tempId,
      text: text,
      userId,
      isTemp: true,
    };

    setMessagesMap((prev) => {
      const result = {
        [tempId]: newMsg,
        ...prev,
      };
      return result;
    });

    setTimeout(() => {
      scrollToBottom();
    }, 50);

    try {
      const { data } = await postMessage({
        variables: {
          channelId,
          text,
          userId,
        },
      });
      const message = data?.postMessage;

      if (message?.messageId) {
        setMessagesMap((prev) => {
          const result = {
            [message.messageId]: message,
            ...prev,
          };
          delete result[tempId];
          return result;
        });
      }
    } catch (errors) {
      setMessagesMap((prev) => {
        const result = { ...prev };
        result[tempId] = {
          ...prev[tempId],
          error: "Error",
        };
        return result;
      });
    }
  }

  if (lastChannelId.current !== channelId) {
    lastChannelId.current = channelId;
    switchChannelMessages();
  }

  useEffect(() => {
    const updateInter = setInterval(updateChannelMessages, 3000);
    return () => {
      clearInterval(updateInter);
    };
  }, [updateChannelMessages]);

  const messages = useMemo(() => Object.values(messagesMap).sort((a, b) => {
    if (a.datetime > b.datetime) {
      return -1;
    }
    if (b.datetime < a.datetime) {
      return 1;
    }
    return 0;
  }), [messagesMap]);

  return { messages, loading, loadPreviousMessages, sendMessage };
}
