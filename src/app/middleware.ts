import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Публичные маршруты
  const publicPaths = ["/login", "/register"];

  // Проверяем токен
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Если пользователь авторизован и пытается зайти на /
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Если неавторизован и маршрут не публичный, редиректим на /login
  if (!token && !publicPaths.includes(pathname) && pathname !== "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/login", "/register"],
};
