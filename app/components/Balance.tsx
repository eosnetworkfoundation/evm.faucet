"use client";

import useSWR from "swr";
import { Box } from "@chakra-ui/react"
import { get_balance } from "../api/tables";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { chainState } from "../atoms";

export const Balance = (props: {address: string}) => {
    const chain = useRecoilValue(chainState);
    const address = props.address
    const { data } = useSWR(`/api/balance/${chain}/${address}`, () => get_balance(address, chain));
    let url = `https://explorer.testnet.evm.eosnetwork.com/address/${address}/tokens`
    if ( address.length <= 12 ) url = `https://${chain}.eosq.eosnation.io/account/${address}`
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