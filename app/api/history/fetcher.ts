import { ACCOUNT } from "../constants";
import { rpc } from "../rpc";

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
