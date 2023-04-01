import { timeout } from "../utils";

export async function POST(request: Request ) {
    await timeout(500);
    return new Response("OK");
}
