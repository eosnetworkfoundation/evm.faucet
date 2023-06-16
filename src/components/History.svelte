<script lang="ts">
    import { get_history } from '$lib/tables';
    import TransferRow from './TransferRow.svelte';
    export let rows: { receiver: String; timestamp: String }[] = [];
    get_history(10).then(({ rows: _rows }) => {
        rows = _rows;
    });
</script>

<div class="flex flex-col gap-1">
    <div class="h-3 font-table font-normal text-xxs tracking-wider uppercase text-history-gray">
        EOS EVM
    </div>
    <div class="w-full h-5 font-table font-normal text-history-gray text-sm">
        Transfer History
    </div>
</div>
<table class="flex flex-col gap-2 w-full sm:w-64 grow max-h-full min-h-0">
    <thead class="flex flex-row justify-between gap-2 w-full sm:w-64 h-min-fit">
        <tr class="contents">
            <th class="h-3 font-table font-normal text-xxs tracking-wider uppercase text-history-gray"
                >Wallet Address</th
            >
            <th class="h-3 font-table font-normal text-xxs pr-6 tracking-wider uppercase text-history-gray"
                >Sent</th
            >
        </tr>
    </thead>
    <tbody class="flex flex-col gap-2 w-full sm:w-64 sm:overflow-auto sm:[scrollbar-gutter:stable]">
        {#each rows || [] as row}
            <TransferRow {...row} />
        {/each}
    </tbody>
</table>
