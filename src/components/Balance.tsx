import useSWR from "swr";
import { Box } from "@chakra-ui/react"
import { fetcher } from "../lib/fetcher";
import Link from "next/link";

export const Balance = (props: {address: string}) => {
    const address = props.address
    const { data } = useSWR(`/api/balance/${address}`, fetcher);
    let url = `https://explorer.testnet.evm.eosnetwork.com/address/${address}/tokens`
    if ( address.length <= 12 ) url = `https://jungle4.eosq.eosnation.io/account/${address}`
    if ( !data ) return <Box w='100%'/>
    const amount = Number(data.toFixed(4));
    return (
        <Box w='100%'>
            <Link href={url} target="_blank" rel="noreferrer">
                Balance <b>{amount} EOS</b>
            </Link>
        </Box>
    )
}