import { Textarea } from "@rebass/forms";
import { Box, Button } from "rebass";
import styled from "styled-components";

export const Root = styled.div`
  height: 100%;
  flex-direction: column;
  display: flex;
`;
export const Title = styled(Box)`
  border-bottom: 1px solid #e6ecf3;
`;
export const Input = styled(Textarea)`
  border-radius: 4px;
  margin: 0 8px !important;
`;
export const AmazingButton = styled(Button)`
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
