import React from "react";
import Button from ".//components/Button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 shadow-sm">
  <div className="flex items-center gap-2">
    <img src="/cartoon.webp" alt="Solar Logo" className="h-10 w-10" />
    <span className="text-xl font-bold text-black">SOLAR</span>
  </div>
  <nav className="flex items-center space-x-6">
    <Link href="/signin">
      <Button variant="ghost" className="text-sm">
        Sign in
      </Button>
    </Link>
    <Link href="/Signup">
      <Button className="bg-yellow-400 hover:bg-yellow-500 text-sm">
        Register
      </Button>
    </Link>
  </nav>
</header>


      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-[#fdfdfd]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/sunrise.jpg"
            alt="Background Shapes"
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="relative z-10 bg-clear bg-opacity-0 rounded-md px-8 py-6 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">SOLAR</h1>
          <p className="text-lg text-gray-700">
            User Friendly AI Resume Checker that gives feedback to improve your Resume!
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="h-4 bg-gray-300 w-full" />

      <footer className="bg-white px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
        {/* Column 1: Social Icons */}
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-3">
            <img src="/icons/twitter.png" alt="X" className="h-5 w-5" />
            <img src="/icons/instagram.png" alt="Instagram" className="h-5 w-5" />
            <img src="/icons/youtube.png" alt="YouTube" className="h-5 w-5" />
            <img src="/icons/linkedin.png" alt="LinkedIn" className="h-5 w-5" />
          </div>
       </div>

      {/* Column 2: Services */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-semibold mb-1">Services</h4>
        <span>AI Resume Check</span>
      </div>

      {/* Column 3: Explore */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-semibold mb-1">Explore</h4>
        <span>Design</span>
        <span>Prototyping</span>
        <span>Development features</span>
        <span>Design systems</span>
        <span>Collaboration features</span>
        <span>Design process</span>
      </div>

      {/* Column 4: Resources */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-semibold mb-1">Resources</h4>
        <span>Blog</span>
        <span>Sample Resumes</span>
        <span>Support</span>
        <span>Developers</span>
      </div>
    </footer>
    </div>
  );
}
