"use client";

import { useState } from "react";
import Button from "./Button";
import Link from "next/link"; 

export default function Signup({ onAddUser }: { onAddUser: (user: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) return;

    onAddUser(formData);
    setFormData({ name: "", username: "", email: "", password: "", imageUrl: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-yellow-200 via-orange-200 to-pink-400 text-black">
      
      <header className="w-full flex justify-between items-center p-4 border-b border-gray-300 bg-white">
        {/* SOLAR button on the left */}
        <Link href="/">
          <span className="text-lg font-semibold cursor-pointer:">SOLAR</span>
        </Link>

        

      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-4 py-12">
       <div className="w-full max-w-md p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-6 text-black">
            {["name", "username", "email", "password"].map((field) => (
              <div key={field} className="flex flex-col">
                <label htmlFor={field} className="mb-1 font-medium text-black">
                  {field === "username" ? "Last Name" : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
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

      {/* <footer className="bg-white px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-black">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-3">
            <img src="/icons/twitter.png" alt="X" className="h-5 w-5" />
            <img src="/icons/instagram.png" alt="Instagram" className="h-5 w-5" />
            <img src="/icons/youtube.png" alt="YouTube" className="h-5 w-5" />
            <img src="/icons/linkedin.png" alt="LinkedIn" className="h-5 w-5" />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold mb-1">Services</h4>
          <span>AI Resume Check</span>
        </div>
        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold mb-1">Explore</h4>
          <span>Design</span>
          <span>Prototyping</span>
          <span>Development features</span>
          <span>Design systems</span>
          <span>Collaboration features</span>
          <span>Design process</span>
        </div>
        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold mb-1">Resources</h4>
          <span>Blog</span>
          <span>Sample Resumes</span>
          <span>Support</span>
          <span>Developers</span>
        </div>
      </footer> */}
    </div>
  );
}
