import { describe, expect, it } from 'vitest';
import { Mocks } from '../Mocks';
describe('Test Mock Creation', () => {
    it('has data', () => {
        const mocks = new Mocks();
        //expect(mocks.data.keySet().toArray().length).greaterThan(0);
    });
    it('get rows has data', () => {
        expect(typeof Mocks.data['mock-data-get-rows']).is('MockInterface');
        expect(Mocks.data['mock-data-get-rows'].url).is(
            'https://jungle4.api.eosnation.io/v1/chain/get_table_rows'
        );
    });
});
