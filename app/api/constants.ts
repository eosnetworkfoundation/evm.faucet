export const ACTOR = process.env.ACTOR ?? 'eosio.faucet';
export const ACCOUNT = process.env.ACCOUNT ?? ACTOR;
export const PERMISSION = process.env.PERMISSION ?? 'active';
export const CHAIN_ID = process.env.CHAIN_ID ?? '73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d';
export const CHAIN_URL = process.env.CHAIN_URL ?? "https://jungle4.api.eosnation.io";
export const BROADCAST = Boolean(process.env.BROADCAST ?? 'true');