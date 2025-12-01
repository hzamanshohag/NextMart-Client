import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasePrivateRoutes; // "user" | "admin"

const authRoutes = ["/login", "/register"];

const roleBasePrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`http://localhost:3000/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (userInfo?.role && roleBasePrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasePrivateRoutes[userInfo.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login" /* match login route */,
    "/create-shop" /* match shop route */,
    "/admin" /* match admin route */,
    "/admin/:page" /* match admin sub pages */,
    "/user" /* match user route */,
    "/user/:page" /* match user sub pages */,
  ],
};
