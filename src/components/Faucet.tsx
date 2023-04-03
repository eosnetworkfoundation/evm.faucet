import { SimpleGrid, Center, Box, Input, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import { GitHub } from "./Github";
import { SendButton } from "./SendButton";
import { Balance } from "./Balance";
import { Telegram } from "./Telegram";
import { Twitter } from "./Twitter";

export const Faucet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const placeholder = "0xaa2F34E41B397aD905e2f48059338522D05CA534 or myaccount"

  useEffect(() => {
    setWalletAddress(localStorage.getItem("walletAddress") || "");
  }, []);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const walletAddress = e.target.value;
    setWalletAddress(walletAddress);
    localStorage.setItem("walletAddress", walletAddress);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      height="100vh"
      margin="auto"
      position="relative"
    >
      <Image alt={"logo"} src="/logo.png" height={150} width={150} />
      <Text fontSize="2xl" marginTop="15px" fontWeight="800" color="#FFFFF">
        Quickly send a $EOS to your wallet.
      </Text>
      <Text fontSize="1xl" color="#FFFFF" fontWeight="500">
        This tool does not send&nbsp;
        <Text as="span" fontWeight="bold">
          real $EOS.
        </Text>
        &nbsp; It is a testnet faucet for the EOS EVM blockchain.
      </Text>
      <Stack marginTop="20px" maxWidth="2xl" width="100%">
        <Input
          variant="filled"
          placeholder={placeholder}
          value={walletAddress}
          onChange={handleOnChange}
        />
        <Stack direction="row">
          <SendButton walletAddress={walletAddress}>
            Send
          </SendButton>
        </Stack>
        <SimpleGrid columns={3} spacingX='40px'>
          <Balance address={walletAddress} />
          <Box w='100%'>
            <Center height={"40px"}>
              <Telegram />
              <GitHub />
              <Twitter />
            </Center>
          </Box>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};
