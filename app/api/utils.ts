export function toJSON(data: any, status = 200) {
    return new Response(JSON.stringify(data), {status, headers: {'content-type': 'application/json'}});
}

export function toText(data: any, status = 200) {
    return new Response(data, {status, headers: {'content-type': 'text/plain'}});
}

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
