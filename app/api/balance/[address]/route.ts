import { toText } from "../../utils";
import { get_balance } from "./fetcher";

export interface Balance {
    address: string, timestamp: number
}

export const runtime = "edge";
export const revalidate = 0;

export async function GET(request: Request, {params}: {params: {address: string}} ) {
    const { address } = params;
    try {
        if ( !address ) throw "address is required";
        const balance = await get_balance(address);
        return toText(balance);
    } catch (e) {
        return toText(e.message, 400);
    }
}
