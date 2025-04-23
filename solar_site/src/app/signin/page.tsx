"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Signin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };

  if (status === "loading") return null; // wait for session status

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-yellow-200 via-orange-200 to-pink-400 text-black">
      <header className="w-full flex justify-between items-center p-4 border-b border-gray-300 bg-white">
        <Link href="/">
          <span className="text-lg font-semibold cursor-pointer">SOLAR</span>
        </Link>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-4 py-12">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
          <h1 className="text-4xl font-bold mb-8 text-center">Sign In</h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-400 text-black font-semibold hover:bg-yellow-500 py-2 rounded"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/Signup" className="font-semibold underline hover:text-blue-600">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
