import { toJSON } from "../utils";
import { get_history } from "../tables";
export interface History {
    address: string, timestamp: number
}

export const runtime = "edge";

export const validate = 0;

export async function GET(request: Request ) {
    const data = await fetcher();
    return toJSON(data);
}

export async function fetcher() {
    const response = await get_history();
    return response.rows.map(row => {
        return {
            address: row.receiver,
            timestamp: new Date(row.timestamp + "Z").getTime()
        }
    })
}
