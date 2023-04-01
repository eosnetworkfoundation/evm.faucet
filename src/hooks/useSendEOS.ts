import { useToast } from "@chakra-ui/react";
import { sanitizeAddress } from "../lib/sanitizeAddress";
import { useMutation } from "react-query";

const NODE_URL_TESTNET = "https://jungle4.api.eosnation.io";

export const useSendEOS = (
  walletAddress: string,
  network: "testnet"
) => {
  const toast = useToast();

  return useMutation(
    ["sendEOS", walletAddress, network],
    async () => {
      // return await transfer(walletAddress, "1.0000 EOS");
    },
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: `EOS sent to ${sanitizeAddress(walletAddress)}`,
          status: "success",
          duration: 9000,
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: JSON.stringify(error.message, null, 2),
          status: "error",
          duration: 9000,
        });
      },
    }
  );
};
