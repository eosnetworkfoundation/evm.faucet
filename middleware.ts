// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import isbot from 'isbot';

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-version`
  const userAgent = request.headers.get('user-agent');
  const requestHeaders = new Headers(request.headers);
  const bot = String(isbot(userAgent));
  requestHeaders.set('isbot', bot);
  console.log({bot, userAgent});

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-version`
  response.headers.set('isbot', bot);
  return response;
}