'use client';

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Button from ".//components/Button";
import Image from "next/image";
import Link from "next/link";
import connectMongoDB from "../../config/mongodb";

type Item = {
  id: number;
  title: string;
  image: string;
};

export default function LandingPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      signOut({ callbackUrl: "/" });
    }
  }, [status]);

  connectMongoDB();

  const [items, setItems] = useState<Item[]>([
    { id: 1, title: "Sample Resume 1", image: "/resumes/sample1.png" },
    { id: 2, title: "Sample Resume 2", image: "/resumes/sample2.png" },
    { id: 3, title: "Sample Resume 3", image: "/resumes/sample3.png" },
  ]);


  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState("");
  

  return (
    <div className="min-h-screen w-full flex flex-col text-gray-800">

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
          Stand out in a crowded job market with the AI resume builder on SOLAR. Instantly craft a resume that’s tailored to spark the interest of job recruiters and get you hired faster.
          </p>
        </div>
      </section>

 
      <div className="h-4 bg-gray-300 w-full" />

      <div className="h-8 bg-white300 w-full" />

      <div className="flex flex-col items-center justify-center flex-grow px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 w-full max-w-6xl">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border shadow rounded p-4 flex flex-col items-center"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={150}
                height={150}
                className="rounded"
              />
              <p className="mt-2 font-semibold text-center">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-4 bg-gray-300 w-full" />

      <footer className="bg-white px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">

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
