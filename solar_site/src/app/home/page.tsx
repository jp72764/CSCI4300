'use client';

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-pink-200 flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <img src="/cartoon.webp" alt="Solar Logo" className="h-10 w-10" />
          <Link href="/" className="text-xl font-bold text-black hover:underline">
            SOLAR
          </Link>
        </div>
        <nav className="flex gap-6">
          {/* <Link href="/addItem" className="px-4 py-2 rounded font-bold text-black hover:bg-gray-200 transition">
            Upload Resume
          </Link> */}
          {/* <Link href="/dashboard" className="px-4 py-2 rounded font-bold text-black hover:bg-gray-200 transition">
            View Examples
          </Link> */}
          <button
            onClick={() => {
              console.log("Logging out...");
              window.location.href = "/signin";
            }}
            className="px-4 py-1 rounded bg-red-500 text-white font-bold"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Welcome Section */}
      <main className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        <h1 className="text-4xl font-bold mb-4 mt-16">Welcome to Solar</h1>
        <p className="text-lg text-gray-800 max-w-xl mb-8">
          You're all set to start improving your resume. Upload your resume to receive AI feedback, or explore sample resumes and feedback in your dashboard.
        </p>
        <div className="flex gap-4">
          <Link href="/addItem">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded">
              Upload Resume
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="bg-white hover:bg-gray-100 border border-gray-300 text-black font-bold py-2 px-6 rounded">
              View Examples
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white py-6 text-center text-sm text-gray-600 shadow-inner">
        © {new Date().getFullYear()} Solar Resume Assistant — All rights reserved.
      </footer>
    </div>
  );
}
