"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      console.log("User logged in:", { email, password });
      router.push("/home");
    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-pink-200 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <Link href="/" className="text-xl font-bold">
          SOLAR
        </Link>
        {/* No Register button here anymore */}
      </div>

      {/* Sign In Form */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 w-full max-w-md"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded bg-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded bg-white"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 py-2 rounded"
          >
            Sign In
          </button>
        </form>

        {/* Register message */}
        <p className="mt-4 text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <Link
  href="/Signup"
  className="text-black font-semibold hover:text-blue-600 hover:underline"
>
  Register here
</Link>


        </p>
      </div>
    </div>
  );
}
