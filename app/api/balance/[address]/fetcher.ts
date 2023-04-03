import { rpc } from "../../rpc";

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
