"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Register user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // 2. Auto-login after registration
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      // 3. Handle login result
      if (result?.error) {
        router.push("/signin"); // Redirect to login if auto-login fails
      } else {
        window.location.href = "/dashboard"; // Full page reload to update auth state
      }

    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-yellow-200 via-orange-200 to-pink-400 text-black">
      <header className="w-full flex justify-between items-center p-4 border-b border-gray-300 bg-white">
        <Link href="/">
          <span className="text-lg font-semibold cursor-pointer">SOLAR</span>
        </Link>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-4 py-12">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
          <h1 className="text-4xl font-bold mb-8 text-center">Sign Up</h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {["username", "email", "password"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="mb-1 font-medium">
                  {field === "username" ? "Username" : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  name={field}
                  type={field === "password" ? "password" : "text"}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-orange-400 text-black font-semibold hover:bg-yellow-500 py-2 rounded"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/signin" className="font-semibold underline hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
