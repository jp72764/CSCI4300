'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login
    if (email && password) {
      console.log("User logged in:", { email, password });

      // Redirect to dashboard after "login"
      router.push("/dashboard");
    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Sign In
      </button>
    </form>
  );
}
