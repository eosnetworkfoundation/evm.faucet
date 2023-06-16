import { describe, expect, it } from 'vitest';
import { sanitizeAddress } from '$lib/utils';

describe('Utils', () => {
    describe('sanitizeAddress', () => {
        it('Shortens address', () => {
            const addr = sanitizeAddress('0x8280464efcD3681F3155a5c04a0a8aB522A14DB0');
            expect(addr).toBe('0x8...2A14DB0');
        });
        it('Returns address as is if 7 chars or less', () => {
            const addr = sanitizeAddress('1234567');
            expect(addr).toBe('1234567');
        });
        it('Shortens address if 8 chars', () => {
            const addr = sanitizeAddress('12345678');
            expect(addr).toBe('123...8');
        });
    });
});
