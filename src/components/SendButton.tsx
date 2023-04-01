import { Button } from "@chakra-ui/react";
import { useSaveLog } from "../hooks/useLogs";
import { useSendEOS } from "../hooks/useSendEOS";
import { PropsWithChildren } from "react";

type SendButtonProps = {
  walletAddress: string;
  type: "testnet";
};

export const SendButton = (props: PropsWithChildren<SendButtonProps>) => {
  const { walletAddress, type } = props;

  const transfer = useSendEOS(walletAddress, type);
  const { mutate: handleLog } = useSaveLog();

  const onSubmit = async () => {
    await transfer.mutateAsync();
    handleLog(walletAddress);
  };

  return (
    <Button
      backgroundColor="rgb(6, 247, 247)"
      color="rgb(42, 49, 49)"
      _hover={{
        backgroundColor: "rgb(6, 247, 247)",
      }}
      onClick={onSubmit}
      flex="1"
      textTransform="uppercase"
      fontWeight="bold"
      isLoading={transfer.isLoading}
      disabled={!walletAddress}
    >
      {props.children}
    </Button>
  );
};
