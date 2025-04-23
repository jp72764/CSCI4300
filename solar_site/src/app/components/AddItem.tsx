"use client";

import { useState } from "react";

let pdfjsLib: any = null;

if (typeof window !== "undefined") {
  (async () => {
        // @ts-ignore

    const pdfjs = await import("pdfjs-dist/build/pdf");
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf-worker.js";
    pdfjsLib = pdfjs;
  })();
}

export default function AddItem({ onUpload }: { onUpload: (title: string, file: File, role: string) => void }) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("general");

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPDF = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPDF) {
      alert("Please upload a valid PDF file.");
      return;
    }

    setResumeFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile || !title) return;
    onUpload(title, resumeFile, role);
    setTitle("");
    setResumeFile(null);
    setRole("general");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded shadow p-6 flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Upload My Resume </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
      />

      <label
        htmlFor="file-upload"
        className="w-full mb-4 border border-dashed border-gray-300 rounded p-2 text-center cursor-pointer text-gray-500 hover:bg-gray-50"
      >
        {resumeFile ? resumeFile.name : "Choose PDF File"}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="application/pdf"
        onChange={handleResumeFileChange}
        className="hidden"
      />

      <label className="text-sm mb-1 text-left w-full">Select Resume Role Type:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="general">General</option>
        <option value="frontend developer">Frontend Developer</option>
        <option value="data scientist">Data Scientist</option>
        <option value="software engineer">Software Engineer</option>
        <option value="hardware engineer">Hardware Engineer</option>
      </select>

      <button
        type="submit"
        disabled={!resumeFile || !title}
        className={`w-full text-white py-2 px-4 rounded ${
          resumeFile && title ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Upload
      </button>
    </form>
  );
}
