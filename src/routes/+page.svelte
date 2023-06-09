<script lang="ts">
    import { PUBLIC_MOCK_HTTP } from '$env/static/public';
    import {Mocks} from "../tests/Mocks";
</script>

<h1>Welcome to EVM Faucet</h1>
<p>This is an empty page</p>
{#if PUBLIC_MOCK_HTTP === 'true'}
    <p>HTTP Mocks have been <strong>Enabled</strong></p>
    <p>{Mocks.data['unknown'].response.body}</p>
{/if}
