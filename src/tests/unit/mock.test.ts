import { describe, expect, expectTypeOf, it } from 'vitest';
import { MockProvider } from '../MockProvider';
import type { MockInterface } from '../MockProvider';
import type { APIResponse } from '@wharfkit/session';

describe('Test Mock Creation', () => {
    it('mock data send has url', async () => {
        const mocker = new MockProvider();
        const mockSendData = await mocker.load('mock-data-send.json');
        expectTypeOf(mockSendData).toMatchTypeOf<MockInterface>;
        expect(mockSendData).toHaveProperty('url');
        expect(mockSendData?.url).toBe('https://faucet.testnet.evm.eosnetwork.com/api/send');
    });
    it('get rows has data', async () => {
        const mocker = new MockProvider();
        const mockTransactions = await mocker.load('mock-data-get-rows.json');
        expect(mockTransactions?.response.body.rows.length).toBeGreaterThan(2);
    });
    it('mock data send 307 return code', async () => {
        const mocker = new MockProvider();
        const mockSendData = await mocker.load('mock-data-send-307.json');
        expectTypeOf(mockSendData).toMatchTypeOf<MockInterface>;
        expect(mockSendData).toHaveProperty('response');
        expect(mockSendData?.response.code).toBe(307);
        expect(mockSendData?.response.location).toBe('/api/ratelimit');
    });
    it('convert to APIResponse', async () => {
        const mocker = new MockProvider();
        const wharfAPIResponse = await mocker.call('/get_rows');
        expectTypeOf(wharfAPIResponse).toMatchTypeOf<APIResponse>;
        expect(wharfAPIResponse).toHaveProperty('json');
        expect(wharfAPIResponse.json.rows.length).toBeGreaterThan(1);
    });
});
