import { Box } from "rebass";
import { Select } from "@rebass/forms";
import styled from "styled-components";

export const Channel = styled.div<{ active?: boolean }>`
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;

    :hover {
        background-color: pink;
    }
    transition: 300ms;

    ${({ active }) => (active ? "background-color: plum;" : "")}
`;

export const Root = styled(Box)`
    border-right: 1px solid #e6ecf3;
    padding: 0 8px;
    height: 100%;
    width: 100%;
`;

export const BeatifulSelect = styled(Select)`
    border-radius: 16px;
`;
