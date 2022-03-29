import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { Box } from "rebass";
import styled, { createGlobalStyle } from "styled-components";
import { client } from "./apollo";
import { Chat } from "./Chat/Chat";
import reportWebVitals from "./reportWebVitals";
import { Sidebar } from "./Sidebar/Sidebar";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
    line-height: 1.15;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  padding: 24px;
  height: calc(100vh - 24px * 2);
`;

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Container>
        <Box width={4 / 12}>
          <Sidebar />
        </Box>
        <Box width={8 / 12}>
          <Chat />
        </Box>
      </Container>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
