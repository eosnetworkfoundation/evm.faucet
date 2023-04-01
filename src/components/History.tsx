import {
  Box,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useSWR from "swr";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { sanitizeAddress } from "../lib/sanitizeAddress";
import { fetcher } from "../../app/api/history/route";
dayjs.extend(relativeTime);

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
              <Tr key={index}>
                <Td>{sanitizeAddress(transfer.address)}</Td>
                <Td>{dayjs(transfer.timestamp).fromNow()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};
