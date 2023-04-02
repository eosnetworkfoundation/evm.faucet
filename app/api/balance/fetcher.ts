import { Checksum256 } from "@wharfkit/session";
import crypto from "crypto";
import { ACCOUNT } from "../constants";
import { rpc } from "../rpc";

export function get_balance(address: string) {
    const hash = crypto.createHash("sha256").update(address.replace("0x", "")).digest("hex");
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
