import { toJSON } from "../utils";
import { get_balance } from "../tables";

export interface Balance {
    address: string, timestamp: number
}

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET(request: Request ) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const address = searchParams.get("address")
        if ( !address ) throw "address is required";
        const response = await get_balance(address);
        const data = response.rows[0]?.balance ?? 0.0;
        return new Response(data);
    } catch (e) {
        return new Response(e.message, {status: 400});
    }
}
