<script lang="ts">
    import { get_history } from '$lib/tables';
    import TransferRow from './TransferRow.svelte';
    export let rows: { receiver: String; timestamp: String }[] = [];
    get_history(10).then(({ rows: _rows }) => {
        rows = _rows;
    });
</script>

<div class="flex flex-col gap-1">
    <div class="h-3 font-table font-normal text-xxs tracking-wider uppercase text-[#B1B1B1]">
        EOS EVM
    </div>
    <div class="w-full h-5 font-table font-normal text-[#B1B1B1] text-sm">
        Transfer History
    </div>
</div>
<table class="flex flex-col p-0 gap-2 w-64 grow max-h-full min-h-0">
    <thead class="flex flex-row justify-between p-0 gap-2 w-64 h-3">
        <tr class="contents">
            <th class="h-3 font-table font-normal text-xxs tracking-wider uppercase text-[#B1B1B1]"
                >Wallet Address</th
            >
            <th class="h-3 font-table font-normal text-xxs pr-6 tracking-wider uppercase text-[#B1B1B1]"
                >Sent</th
            >
        </tr>
    </thead>
    <tbody class="flex flex-col gap-2 w-64 overflow-auto" style="scrollbar-gutter:stable">
        {#each rows || [] as row}
            <TransferRow {...row} />
        {/each}
    </tbody>
</table>
