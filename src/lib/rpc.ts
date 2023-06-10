import { APIClient } from '@wharfkit/session';
import { CHAIN_URL, CHAINS } from './constants';
import { PUBLIC_MOCK_HTTP } from '$env/static/public';
import { MockProvider } from '../tests/MockProvider';

const setRPC = (url: string): APIClient => {
    if (PUBLIC_MOCK_HTTP === 'true') {
        return new APIClient({ provider: new MockProvider() });
    }
    return new APIClient({ url: CHAIN_URL });
};
export const rpc: APIClient = setRPC(CHAIN_URL);

export const rpcs = (chain: string) => setRPC(CHAINS[chain].url);
