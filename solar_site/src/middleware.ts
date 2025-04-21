// src/middleware.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth?.user;
    console.log('app', req.nextUrl.pathname);
    const authPaths = ['/dashboard', '/signup'];
    const isAuthPath = authPaths.some((path) => req.nextUrl.pathname.startsWith(path));

    if (isAuthPath && isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!isAuthPath && !isLoggedIn) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
});

export const config = {
    matcher: ['/dashboard', '/signup'],
};