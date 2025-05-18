import { NextResponse } from 'next/server';

import { auth } from './common/auth';

const UNAUTHENTICATED_PAGE_LIST = ['/signin'];

export const config = {
  matcher: [
    '/((?!_next|sign-in|sign-up|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};

export default auth(async (req) => {
  const { auth, nextUrl } = req;

  const isAuthenticated = !!auth;
  const isUnAuthenticatedPage = UNAUTHENTICATED_PAGE_LIST.includes(nextUrl.pathname);

  // ログイン済、ログインページ => /
  if (isAuthenticated && isUnAuthenticatedPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // ログイン未、ログインページ以外 => /signin
  if (!isAuthenticated && !isUnAuthenticatedPage) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
});
