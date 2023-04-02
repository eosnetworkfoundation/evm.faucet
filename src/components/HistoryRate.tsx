import useSWR from "swr";

export async function fetcher(url: string) {
    const response = await fetch(url);
    return response.json();
}

export const HistoryRate = () => {
    const { data } = useSWR('/api/history/rate', fetcher)
    const rate = data ? Math.floor(data.rate.per_hour) : "∞"
    return (
        <><br/><i>ℹ️ Processing <b>{rate}</b> transactions per hour</i></>
    )
}