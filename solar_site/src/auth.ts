import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/User";
import { Session } from "next-auth";
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
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const email = credentials.email as string;
                const password = credentials.password as string;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email }).lean() as unknown as { _id: string; password: string; email: string; username: string };

                    if (user) {
                        const isMatch = await bcrypt.compare(password, user.password);
                        if (isMatch) {
                            // Update lastLogin
                            await User.updateOne({ _id: user._id }, { lastLogin: new Date() });

                            return {
                                id: user._id.toString(),
                                email: user.email,
                                username: user.username,
                            };
                        } else {
                            console.log("Email or Password is not correct");
                            return null;
                        }
                    } else {
                        console.log("User not found");
                        return null;
                    }
                } catch (error: any) {
                    console.log("An error occurred:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
              session.user.id = token.sub;
            }
            return session;
          },
      },
});
