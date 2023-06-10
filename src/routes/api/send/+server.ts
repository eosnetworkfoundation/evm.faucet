import { nonce, send } from '$lib/actions';
import { session } from '$lib/config';
import { json } from '@sveltejs/kit';
// required for mock response
import { PUBLIC_MOCK_HTTP } from '$env/static/public';
import { MockProvider } from '../../../tests/MockProvider';

export async function POST({ request }) {
    try {
        if (PUBLIC_MOCK_HTTP === 'true') {
            const mocker = new MockProvider();
            const sendDataMock = await mocker.load('mock-data-send.json');
            return json(
                sendDataMock?.response.body || { message: 'error: no mock response found' },
                {status: sendDataMock?.response.code}
            );
        }
        const { to, chain } = await request.json();
        if (!to) throw 'to is required';
        const actions = [send(to), nonce()];
        const response = await session(chain).transact({ actions });
        return json({ response }, { status: 200 });
    } catch (e) {
        const message = (e as Error)?.message?.replace('assertion failure with message: ', '') || e;
        return json({ message: message as string }, { status: 400 });
    }
}
