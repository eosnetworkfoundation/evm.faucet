import { nonce, send } from "../actions";
import { session } from "../config";
import { toJSON } from "../utils";

export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        const { to } = await request.json();
        if ( !to ) throw "to is required";
        const actions = [ send(to), nonce() ];
        const response = await session.transact({actions})
        return toJSON(response);
    } catch (e) {
        const message = e?.message?.replace("assertion failure with message: ", "") || e;
        return new Response(message, {status: 400});
    }
}
