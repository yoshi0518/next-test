import { NextResponse } from 'next/server';
import { auth } from '@/common/auth';
import { env } from '@/common/env';
import { Dayjs } from '@/common/lib/dayjs';
import { jwtDecode } from 'jwt-decode';

const UNAUTHENTICATED_PAGE_LIST = ['/login', '/logout', '/reset'];

export const config = {
  matcher: [
    '/((?!_next|sign-in|sign-up|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};

export default auth(async (req) => {
  console.log('[middleware]');
  const { auth, nextUrl } = req;
  const isAuthenticated = !!auth;
  const isUnAuthenticatedPage = UNAUTHENTICATED_PAGE_LIST.includes(nextUrl.pathname);
  const isValidateRefreshToken = (() => {
    if (isAuthenticated && typeof auth.user.refresh_token === 'string') {
      const decoded = jwtDecode(auth.user.refresh_token);
      // console.log({ decoded });

      if (
        'expired_dt' in decoded &&
        typeof decoded.expired_dt === 'string' &&
        decoded.expired_dt < new Dayjs().format()
      ) {
        return false;
      }

      return true;
    }

    return true;
  })();
  // console.log({ isAuthenticated, isUnAuthenticatedPage, isValidateRefreshToken });

  // 認証済、リフレッシュトークン無効、ログイン関連ページ以外 => /login?expired=true
  if (isAuthenticated && !isValidateRefreshToken && !isUnAuthenticatedPage) {
    return NextResponse.redirect(new URL('/login?expired=true', `${env.BASE_URL_APP}`));
  }

  // 認証済、リフレッシュトークン有効、ログイン関連ページ => /
  if (isAuthenticated && isValidateRefreshToken && isUnAuthenticatedPage) {
    return NextResponse.redirect(new URL('/', `${env.BASE_URL_APP}`));
  }

  // 未認証、ログイン関連ページ以外 => /login
  if (!isAuthenticated && !isUnAuthenticatedPage) {
    return NextResponse.redirect(new URL('/login', `${env.BASE_URL_APP}`));
  }
});
