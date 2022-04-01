import { gql } from "@apollo/client";

export const POST_MESSAGE = gql`
  mutation Mutations($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      datetime
      messageId
      text
      userId
    }
  }
`;

export type ArgsPostMessage = {
  channelId: string;
  text: string;
  userId: string;
};

export type ResultPostMessage = {
  postMessage: {
    datetime: string;
    messageId: string;
    text: string;
    userId: string;
  };
};
