import { gql } from "@apollo/client";

export const FETCH_MORE_MESSAGES = gql`
  query ($channelId: String!, $messageId: String!, $old: Boolean!) {
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      datetime
      messageId
      text
      userId
    }
  }
`;

export type ArgsFetchMoreMessages = {
  channelId: string;
  messageId: string;
  old: boolean;
};

export type ResultFetchMoreMessages = {
  fetchMoreMessages: {
    datetime: string;
    messageId: string;
    text: string;
    userId: string;
  }[];
};
