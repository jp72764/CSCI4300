import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectMongoDB from "../config/mongodb";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        try {
          await connectMongoDB();
          
          const user = await User.findOne({ 
            email: credentials.email?.toString().toLowerCase() 
          });
          
          if (!user) return null;

          const valid = await bcrypt.compare(
            credentials.password?.toString() || "",
            user.password
          );

          return valid ? {
            id: user._id.toString(),
            email: user.email,
            name: user.username
          } : null;

        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id as string;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  trustHost: true
};
