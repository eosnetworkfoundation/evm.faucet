import { APIClient } from "@wharfkit/session"
import { CHAINS, CHAIN_URL } from "./constants"

export const rpc = new APIClient({
    url: CHAIN_URL,
})

export const rpcs = (chain: string) => {
    return new APIClient({url: CHAINS[chain].url})
}