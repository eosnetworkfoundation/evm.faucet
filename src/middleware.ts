// middleware.ts

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
/*
export function middleware(request: NextRequest) {
  const TIMEOUT = 60;
  const LIMIT = 5;
  const now = Math.floor(Date.now() / 1000);
  const cookies = request.cookies.get('usage');
  let [timestamp, counter] = (cookies ? cookies.value.split(':') : [now, 0]).map(Number);
  counter += 1;

  if ( request.nextUrl.pathname === '/api/send' ) {
    const isReset = (now - timestamp) > TIMEOUT;
    if ( isReset ) counter = 1;
    const usage = isReset ? `${now}:1` : `${timestamp}:${counter}`;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('usage', usage);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    response.cookies.set('usage', usage);
    console.log('middleware', {usage, isReset});
    if ( counter > LIMIT ) {
      request.nextUrl.pathname = '/api/ratelimit';
      return NextResponse.redirect(request.nextUrl);
    }
    return response;
  }
  return NextResponse.next();
}
*/
