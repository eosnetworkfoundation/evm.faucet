import { nonce, send } from '$lib/actions';
import { session } from '$lib/config';
import { json } from '@sveltejs/kit';
export async function POST(request: Request) {
    try {
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
