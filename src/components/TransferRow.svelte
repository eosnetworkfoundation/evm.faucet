<script>
    import { sanitizeAddress } from '$lib/utils';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    import updateLocale from 'dayjs/plugin/updateLocale';
    import OpenIcon from '$lib/assets/open-in-newtab.svg';

    dayjs.extend(relativeTime);
    dayjs.extend(updateLocale);
    dayjs.updateLocale('en', {
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d min',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years',
        },
    });

    export let receiver;
    export let timestamp;

    let url = `https://explorer.testnet.evm.eosnetwork.com/address/${receiver}`;
    if (receiver.length <= 12) url = `https://jungle4.eosq.eosnation.io/account/${receiver}`;
    const short = sanitizeAddress(receiver);
    const time = dayjs(timestamp + 'Z').fromNow();
</script>

<tr
    class="flex flex-row justify-between items-center py-2.5 w-64 h-10 rounded-lg"
>
    <td class="contents">
        <a
            class="w-24 h-5 font-table font-normal text-[#B1B1B1] text-sm tracking-[-.02em]"
            href={url}
            target="_blank"
            rel="noreferrer">{short}</a
        >
    </td>
    <td class="contents">
        <a
            class="flex flex-row items-baseline gap-1 h-5 pr-6"
            href={url}
            target="_blank"
            rel="noreferrer"
        >
            <div
                class="max-w-32 h-5 font-table font-light text-[#B1B1B1] text-sm tracking-tight"
            >
                {time}
            </div>
            <div class="w-3.5 h-3.5 flex justify-center align-middle">
                <img class="w-3 h-3" src={OpenIcon} alt="Open in new tab" />
            </div></a
        >
    </td>
</tr>
