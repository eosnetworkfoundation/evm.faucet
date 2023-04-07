import { ACCOUNT } from "./constants";
import { rpc } from "./rpc";

export async function get_history_rate() {
    const response = await get_history(2000);
    const now = Math.floor(new Date().getTime() / 1000);
    const last = new Date(response.rows.reverse()[0].timestamp + "Z").getTime() / 1000;
    const total = response.rows.length;
    const rate = total / (now - last);

    return {
        now,
        total,
        last,
        rate: {
            per_second: rate,
            per_minute: rate * 60,
            per_hour: rate * 60 * 60,
        }
    };
}

export async function get_history(limit = 8) {
    return rpc.v1.chain.get_table_rows({
        code: ACCOUNT,
        scope: ACCOUNT,
        table: "history",
        json: true,
        limit,
        reverse: true,
    })
}

export async function get_stats(limit = 2) {
    return rpc.v1.chain.get_table_rows({
        code: ACCOUNT,
        scope: ACCOUNT,
        table: "stats",
        json: true,
        limit,
        reverse: true,
    })
}

export async function get_balance(address: any) {
    if ( address.length <= 12 ) return get_balance_eos(address);
    return get_balance_evm(address);
}

export async function get_balance_eos(address: any) {
    const response = await rpc.v1.chain.get_currency_balance("eosio.token", address, "EOS");
    if ( !response.length ) return 0.0
    return response[0].value;
}

export async function get_balance_evm(address: any) {
    address = address.replace("0x", "");
    const response = await rpc.v1.chain.get_table_rows({
        code: "eosio.evm",
        scope: "eosio.evm",
        table: "account",
        index_position: "secondary",
        lower_bound: address,
        upper_bound: address,
        json: true,
        limit: 1,
        key_type: "sha256",
    })
    if (response.rows.length === 0) return 0.0
    return parseInt(response.rows[0].balance, 16) / 10 ** 18;
}
