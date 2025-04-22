import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Remove circular dependencies and use proper initialization
const { handlers, auth } = NextAuth(authConfig);

export const { GET, POST } = handlers;
export { auth };
