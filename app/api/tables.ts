import { Checksum256, Bytes } from "@wharfkit/session";
import crypto from "crypto";
import { ACCOUNT } from "./constants";
import { rpc } from "./rpc";

export function get_history(limit = 8) {
    return rpc.v1.chain.get_table_rows({
        code: ACCOUNT,
        scope: ACCOUNT,
        table: "history",
        json: true,
        limit,
        reverse: true,
    })
}

export function get_balance(address: string) {
    address = address.replace("0x", "")
    const hash = crypto.createHash("sha256").update(address).digest("hex");
    const checksum = Checksum256.from(hash);

    return rpc.v1.chain.get_table_rows<Checksum256>({
        code: ACCOUNT,
        scope: ACCOUNT,
        table: "account",
        index_position: "secondary",
        lower_bound: checksum,
        upper_bound: checksum,
        json: true,
        limit: 1,
    })
}

// (async () => {
//     const balance = await get_balance("0xaa2F34E41B397aD905e2f48059338522D05CA534")
//     console.log(balance)
// })();