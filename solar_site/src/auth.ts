import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectMongoDB from "../config/mongodb";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // 1. Connect to DB
          await connectMongoDB();
          
          // 2. Find user
          const user = await User.findOne({ 
            email: credentials?.email?.toString().toLowerCase() 
          });
          
          if (!user) return null;

          // 3. Verify password
          const valid = await bcrypt.compare(
            credentials?.password?.toString() || "",
            user.password
          );

          // 4. Return user object
          return valid ? {
            id: user._id.toString(),
            email: user.email,
            name: user.username,
          } : null;

        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id as string;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
