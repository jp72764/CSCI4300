'use client';

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
        <div className="flex gap-6">
        <Link
  href="/Signup"
  className="px-4 py-2 rounded font-bold text-black hover:bg-gray-200 transition"
>
  Register
</Link>

        </div>
      </div>

      {/* Form Content */}
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
