import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH, HOME } from "./shared/router/routes";
import { config as appConfig } from "./shared/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get(appConfig.auth.JWT.REFRESH_TOKEN);
  const isAuthPage = pathname === AUTH;
  const isProtectedRoute = pathname === HOME || pathname.startsWith("/api/");

  console.log("Middleware:", {
    pathname,
    hasRefreshToken: !!refreshToken,
    isAuthPage,
    isProtectedRoute,
  });

  // Для авторизованных пользователей
  if (refreshToken) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL(HOME, request.url));
    }
    return NextResponse.next();
  }

  // Для неавторизованных пользователей
  if (isProtectedRoute) {
    return NextResponse.redirect(new URL(AUTH, request.url));
  }

  return NextResponse.next();
}

export const middlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
