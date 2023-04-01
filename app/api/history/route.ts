import { toJSON } from "../utils";
import { ACCOUNT, session } from "../config";
export interface History {
    address: string, timestamp: number
}

export async function GET(request: Request ) {
    const response = await session.client.v1.chain.get_table_rows({
        code: ACCOUNT,
        scope: ACCOUNT,
        table: "history",
        json: true,
        limit: 8,
        reverse: true,
    })
    const data: History[] = response.rows.map(row => {
        return{
            address: row.receiver,
            timestamp: new Date(row.timestamp + "Z").getTime()
        }
    })
    return toJSON(data);
}
