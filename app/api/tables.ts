import { ACCOUNT, CHAIN_DEFAULT, FAUCET } from "./constants";
import { rpcs } from "./rpc";

export async function get_history(limit = 8) {
    const rpc = rpcs(CHAIN_DEFAULT);
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
    const rpc = rpcs(CHAIN_DEFAULT);
    return rpc.v1.chain.get_table_rows({
        code: FAUCET,
        scope: FAUCET,
        table: "stats",
        json: true,
        limit,
        reverse: true,
    })
}

export async function get_balance(address: string, chain: string) {
    if ( address.length <= 12 ) return get_balance_eos(address, chain);
    return get_balance_evm(address);
}

export async function get_balance_eos(address: string, chain: string) {
    const rpc = rpcs(chain);
    const response = await rpc.v1.chain.get_currency_balance("eosio.token", address, "EOS");
    if ( !response.length ) return 0.0
    return response[0].value;
}

export async function get_balance_evm(address: any) {
    const rpc = rpcs(CHAIN_DEFAULT);
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
