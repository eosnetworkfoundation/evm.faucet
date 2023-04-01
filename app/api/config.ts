import { Session, SessionArgs, SessionOptions } from '@wharfkit/session'
import { WalletPluginPrivateKey } from '@wharfkit/wallet-plugin-privatekey'
import { ACTOR, BROADCAST, CHAIN_ID, CHAIN_URL, PERMISSION } from './constants';

// Required
if (!process.env.PRIVATE_KEY) throw new Error('PRIVATE_KEY is required');

// Optional
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