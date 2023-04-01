export function toJSON(data: any) {
    return new Response(JSON.stringify(data), {headers: {'content-type': 'application/json'}});
}

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
