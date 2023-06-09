import { PUBLIC_ACTOR } from "$env/static/public";

export const ACTOR = PUBLIC_ACTOR;
export const ACCOUNT = 'eosio.faucet';
export const EVM = 'eosio.evm';
export const FAUCET = ACCOUNT;
export const PERMISSION = process.env.PERMISSION ?? 'active';
export const BROADCAST = Boolean(process.env.BROADCAST ?? 'true');

export const CHAINS = {
    jungle4: {
        id: '73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d',
        url: 'https://jungle4.api.eosnation.io',
        explorer: 'https://jungle4.eosq.eosnation.io',
    },
    // kylin: {
    //     id: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
    //     url: 'https://kylin.api.eosnation.io',
    //     explorer: 'https://kylin.eosq.eosnation.io',
    // }
}
export const CHAIN_DEFAULT = "jungle4";
export const CHAIN_ID = CHAINS[CHAIN_DEFAULT].id;
export const CHAIN_URL = CHAINS[CHAIN_DEFAULT].url;