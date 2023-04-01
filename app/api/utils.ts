export function toJSON(data: any, status = 200) {
    return new Response(JSON.stringify(data), {status, headers: {'content-type': 'application/json'}});
}

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
