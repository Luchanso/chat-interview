import { Image } from "rebass";
import styled from "styled-components";

export const Container = styled.div<{ isMe: boolean; }> `
  display: flex;
  flex-direction: ${({ isMe }) => (isMe ? "row-reverse" : "row")};
  padding: 4px 8px;
  animation-name: fade-in;
  animation-duration: 300ms;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;
export const ColorPlate = styled.div<{
  isMe: boolean;
  isTemp?: boolean;
  isError?: boolean;
}> `
  padding: 8px;
  background-color: ${({ isMe, isTemp, isError }) => {
    if (isError) {
      return "tomato";
    }
    if (isTemp) {
      return "silver";
    }
    return isMe ? "plum" : "pink";
  }};
  flex-direction: ${({ isMe }) => (isMe ? "row-reverse" : "row")};
  border-radius: 16px;
  max-width: 60%;
  display: flex;
  transition: 300ms;
`;
export const Avatar = styled(Image)`
  border-radius: 16px;
  width: 48px;
  min-height: 48px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.33);
`;
