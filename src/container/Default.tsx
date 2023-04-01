import { Container, Flex } from "@chakra-ui/react";
import { TransferHistory } from "../components/History";
import { Faucet } from "../components/Faucet";
import { Head } from "../components/Head";

export const DefaultContainer = () => {
  return (
    <>
      <Head />
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
    </>
  );
};
