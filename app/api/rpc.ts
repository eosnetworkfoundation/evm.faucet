import { APIClient } from "@wharfkit/session"
import { CHAIN_URL } from "./constants"

export const rpc = new APIClient({
    url: CHAIN_URL,
})