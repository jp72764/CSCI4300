import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
const { handlers, auth } = NextAuth(authConfig);
export const { GET, POST } = handlers;
export { auth };
