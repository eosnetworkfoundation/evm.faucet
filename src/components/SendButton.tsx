import { Button, useToast } from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import { sanitizeAddress } from "../lib/sanitizeAddress";
import { useSWRConfig } from "swr"
import { timeout } from "../../app/api/utils";

type SendButtonProps = {
  walletAddress: string;
};

export const SendButton = (props: PropsWithChildren<SendButtonProps>) => {
  const { walletAddress } = props;
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const onSubmit = async () => {
    if ( isLoading ) return;
    setLoading(true);
    try {
      const response = await fetch("/api/send", {body: JSON.stringify({to: walletAddress}), method: "POST"})
      if (!response.ok) {
        throw new Error(await response.text());
      }
      toast({
        title: "Success",
        description: `EOS sent to ${sanitizeAddress(walletAddress)}`,
        status: "success",
        duration: 4000,
        isClosable: true
      });
      await timeout(1000)
      mutate("/api/history");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 4000,
      });
    }
    setLoading(false);
  };

  return (
    <Button
      backgroundColor="#3E65C2"
      color="rgb(42, 49, 49)"
      _hover={{
        backgroundColor: "#FFFFFF",
      }}
      onClick={onSubmit}
      flex="1"
      textTransform="uppercase"
      fontWeight="bold"
      isLoading={isLoading}
      disabled={!walletAddress || isLoading}
    >
      {props.children}
    </Button>
  );
};
