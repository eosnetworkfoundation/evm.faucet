import { Button, useToast } from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import { sanitizeAddress } from "../lib/sanitizeAddress";

type SendButtonProps = {
  walletAddress: string;
};

export const SendButton = (props: PropsWithChildren<SendButtonProps>) => {
  const { walletAddress } = props;
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async () => {
    if ( isLoading ) return;
    setLoading(true);
    try {
      const response = await fetch("/api/send", {body: JSON.stringify({walletAddress}), method: "POST"});
      toast({
        title: "Success",
        description: `EOS sent to ${sanitizeAddress(walletAddress)}`,
        status: "success",
        duration: 4000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: "Error",
        description: JSON.stringify(error.message, null, 2),
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
