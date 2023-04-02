import { Box, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import useSWR from "swr";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { sanitizeAddress } from "../lib/sanitizeAddress";
import { get_history } from "../../app/api/tables";
import Link from "next/link";
dayjs.extend(relativeTime);

async function fetcher() {
  const response = await get_history();
  return response.rows.map(row => {
    return {
        address: row.receiver,
        timestamp: new Date(row.timestamp + "Z").getTime()
    }
  })
}

export const TransferHistory = () => {
  const { data, error, isLoading } = useSWR('/api/history', fetcher)

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
            {data?.map((transfer, index) => (
              <TransferRow key={index} transfer={transfer} />
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

const TransferRow = ({ transfer }) => {
  const url = `https://explorer.testnet.evm.eosnetwork.com/address/${transfer.address}`;
  const address = sanitizeAddress(transfer.address);
  const time = dayjs(transfer.timestamp).fromNow();
  return (
    <Tr>
      <Td><Link href={url} target="_blank" rel="noreferrer">{address}</Link></Td>
      <Td>{time}</Td>
    </Tr>
  )
}
