export type Msg = {
  datetime: string;
  messageId: string;
  text: string;
  userId: string;
  error?: string;
  isTemp?: boolean;
};
