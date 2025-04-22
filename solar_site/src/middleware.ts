import { auth } from "@/auth"; // Import from your auth config
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const protectedPaths = ["/dashboard"];
  const authPaths = ["/signin", "/signup"];
  
  const isProtected = protectedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  );
  
  const isAuthPath = authPaths.includes(req.nextUrl.pathname);

  if (isAuthPath && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
