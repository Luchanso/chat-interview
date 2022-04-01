import { gql } from "@apollo/client";

export const FETCH_LATEST_MESSAGES = gql`
  query ($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      datetime
      messageId
      text
      userId
    }
  }
`;

export type ArgsFetchLatestMessages = {
  channelId: string;
};

export type ResultFetchLatestMessages = {
  fetchLatestMessages: {
    datetime: string;
    messageId: string;
    text: string;
    userId: string;
  }[];
};
