import { nonce, send } from "$lib/actions";
import { session } from "$lib/config";
import { toJSON } from "$lib/utils";

export async function POST({ request }) {
    try {
        const { to, chain } = await request.json();
        if ( !to ) throw "to is required";
        const actions = [ send(to), nonce() ];
        const response = await session(chain).transact({actions})
        return toJSON(response);
    } catch (e) {
        const message = (e as Error)?.message?.replace("assertion failure with message: ", "") || e;
        return new Response((message as string), {status: 400});
    }
}
