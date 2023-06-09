export async function GET(request: Request) {
    return new Response('rate limit exceeded', { status: 429 });
}

export async function POST(request: Request) {
    return new Response('rate limit exceeded', { status: 429 });
}
