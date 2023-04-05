import useSWR from "swr";
import { get_history_rate } from "../../app/api/tables";

export const HistoryRate = () => {
    const { data } = useSWR('/api/history/rate', get_history_rate)
    const rate = data ? Math.floor(data.rate.per_hour) : "∞"
    // const rate = "∞"
    return (
        <><br/><i>ℹ️ Processing <b>{rate}</b> transactions per hour</i></>
    )
}