'use client';

import AddItem from '@/app/components/AddItem';
import Link from 'next/link';

export default function AddItemPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-yellow-200 via-orange-200 to-pink-400 text-black">
      <header className="w-full flex justify-between items-center p-4 border-b border-gray-300 bg-white shadow-sm">
        <Link href="/">
          <span className="font-bold text-lg cursor-pointer hover:underline">SOLAR</span>
        </Link>

        <button
          onClick={() => {
            console.log("Logging out...");
            window.location.href = "/signin";
          }}
          className="px-4 py-1 rounded bg-red-500 text-white font-bold"
        >
          Logout
        </button>
      </header>


      <main className="flex-1 flex items-center justify-center py-10">
        <AddItem />
      </main>

      <footer className="bg-white px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-black">
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
      </footer>
    </div>
  );
}
