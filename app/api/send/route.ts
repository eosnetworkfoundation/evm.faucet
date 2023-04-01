import { send } from "../actions";
import { session } from "../config";
import { toJSON } from "../utils";

export async function POST(request: Request ) {
    try {
        const { to } = await request.json();
        if ( !to ) throw "to is required";
        const response = await session.transact({action: send(to)})
        return toJSON(response);
    } catch (e) {
        const message = e.message.replace("assertion failure with message: ", "");
        return new Response(message, {status: 400});
    }
}
