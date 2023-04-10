"use client";

import theme from "./theme";
import Navbar from "./components/Navbar/Navbar";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ChakraProvider } from "@chakra-ui/react";
import { Container, Flex } from "@chakra-ui/react";
import { TransferHistory } from "./components/History";
import { Faucet } from "./components/Faucet";

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <GoogleAnalytics trackPageViews />
      <Navbar />
      <Container maxW="100%">
        <Flex
          flexDirection={{
            base: "column",
            md: "row",
          }}
          alignItems="center"
        >
          <Faucet />
          <TransferHistory />
        </Flex>
      </Container>
    </ChakraProvider>
  )
}
