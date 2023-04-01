import { Session, SessionArgs, SessionOptions } from '@wharfkit/session'
import { WalletPluginPrivateKey } from '@wharfkit/wallet-plugin-privatekey'

// Required
if (!process.env.PRIVATE_KEY) throw new Error('PRIVATE_KEY is required');

// Optional
export const ACTOR = process.env.ACTOR ?? 'eosio.faucet';
export const ACCOUNT = process.env.ACCOUNT ?? ACTOR;
export const PERMISSION = process.env.PERMISSION ?? 'active';
export const CHAIN_ID = process.env.CHAIN_ID ?? '73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d';
export const CHAIN_URL = process.env.CHAIN_URL ?? "https://jungle4.api.eosnation.io";
export const BROADCAST = Boolean(process.env.BROADCAST ?? 'true');

export const permissionLevel = {
    actor: ACTOR,
    permission: PERMISSION,
}
export const authorization = [permissionLevel]

export const private_key = new WalletPluginPrivateKey(process.env.PRIVATE_KEY)

const sessionArgs: SessionArgs = {
    chain: {
        id: CHAIN_ID,
        url: CHAIN_URL,
    },
    permissionLevel,
    walletPlugin: private_key
}

const sessionOptions: SessionOptions = {
    expireSeconds: 30,
    broadcast: BROADCAST
}

export const session = new Session(sessionArgs, sessionOptions)