import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const authRoutes = ["/login", "/register"];

  const userInfo = await getCurrentUser();
  console.log("Current User Info:", userInfo);

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`http://localhost:3000/login?redirect=${pathname}`, request.url)
      );
    }
  }
};

export const config = {
  matcher: [
    "/login" /* match login route */,
    "/register" /* match register route */,
    "/create-shop" /* match shop route */,
  ],
};
