import { Box, Heading, Spinner, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import useSWR from "swr";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { sanitizeAddress } from "../lib/sanitizeAddress";
import Link from "next/link";
import { HistoryRate } from "./HistoryRate";
import { get_history } from "../../app/api/tables";
dayjs.extend(relativeTime);

export const TransferHistory = () => {
  const { data, error, isLoading } = useSWR('/api/history', () => get_history(8))

  return (
    <Box padding="20px" maxHeight="100vh" overflow="auto">
      <Heading size="lg" marginBottom="20px">
        Transfer History
      </Heading>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Wallet Address</Th>
              <Th>Sent At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.rows.map((row, index) => {
              return <TransferRow key={index} {...row} />
            })}
          </Tbody>
          <Tfoot>
          </Tfoot>
        </Table>
      )}
      <HistoryRate />
    </Box>
  );
};

const TransferRow = (props: { id: number, receiver: string, timestamp: string}) => {
  const address = props.receiver;
  let url = `https://explorer.testnet.evm.eosnetwork.com/address/${address}`;
  if ( address.length <= 12 ) url = `https://jungle4.eosq.eosnation.io/account/${address}`
  const short = sanitizeAddress(address);
  const time = dayjs(props.timestamp + "Z").fromNow();
  return (
    <Tr>
      <Td><Link href={url} target="_blank" rel="noreferrer">{short}</Link></Td>
      <Td>{time}</Td>
    </Tr>
  )
}
