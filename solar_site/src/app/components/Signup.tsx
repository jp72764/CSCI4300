"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Link from "next/link";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        router.push("/signin");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred");
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
        <div className="w-full max-w-md p-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-black">Sign Up</h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-6 text-black">
            {["username", "email", "password"].map((field) => (
              <div key={field} className="flex flex-col">
                <label htmlFor={field} className="mb-1 font-medium text-black">
                  {field === "username" ? "Username" : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  name={field}
                  type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required={field === "email" || field === "password"}
                />
              </div>
            ))}
            <Button type="submit" className="w-full bg-orange-400 text-black font-semibold hover:bg-yellow-500">
              Register
            </Button>
          </form>

          <p className="text-center text-sm mt-4 text-black">
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
