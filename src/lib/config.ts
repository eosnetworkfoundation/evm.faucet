import { Session, SessionArgs, SessionOptions } from '@wharfkit/session'
import { WalletPluginPrivateKey } from '@wharfkit/wallet-plugin-privatekey'
import { ACTOR, BROADCAST, CHAIN_ID, CHAIN_URL, CHAINS, PERMISSION } from './constants';
import { PRIVATE_KEY } from '$env/static/private';

// Required
if (!PRIVATE_KEY) throw new Error('PRIVATE_KEY is required');

// Optional
export const permissionLevel = {
    actor: ACTOR,
    permission: PERMISSION,
};
export const authorization = [permissionLevel];

export const private_key = new WalletPluginPrivateKey(PRIVATE_KEY);

const sessionArgs = (chain: string): SessionArgs => {
    return {
        chain: {
            id: CHAINS[chain].id || CHAIN_ID,
            url: CHAINS[chain].url || CHAIN_URL,
        },
        permissionLevel,
        walletPlugin: private_key
    };
};

const sessionOptions: SessionOptions = {
    expireSeconds: 30,
    broadcast: BROADCAST
};

export const session = (chain: string) => new Session(sessionArgs(chain), sessionOptions);