"use client";

import useSWR from "swr";
import { get_stats } from "../api/tables";

export const HistoryRate = () => {
    const { data } = useSWR('/api/stats', () => get_stats())
    let rate = "∞"
    const now = new Date().valueOf();
    let highest = 0;
    let sum = 0;
    for ( const row of data?.rows ?? [] ) {
        const timestamp = new Date(row.timestamp + "Z").valueOf();
        const diff = now - timestamp;
        highest = Math.max(highest, diff);
        sum += Number(row.counter.toString());
    }
    const HOUR = 3600000;
    if ( sum ) rate = String(Math.floor((sum / highest) * HOUR))
    return (
        <><br/><i>ℹ️ Processing <b>{rate}</b> transactions per hour</i></>
    )
}