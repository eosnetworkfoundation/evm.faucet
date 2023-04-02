import { toJSON } from "../../utils";
import { get_history } from "../fetcher";

export interface History {
    address: string, timestamp: number
}

export const runtime = "edge";

export const revalidate = 600;

export async function GET(request: Request ) {
    const response = await get_history(5000);
    const now = Math.floor(new Date().getTime() / 1000);
    const last = new Date(response.rows.reverse()[0].timestamp + "Z").getTime() / 1000;
    const total = response.rows.length;
    const rate = total / (now - last);

    return toJSON({
        now,
        total,
        last,
        rate: {
            per_second: rate,
            per_minute: rate * 60,
            per_hour: rate * 60 * 60,
        }
    });
}
