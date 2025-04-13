"use client";

import { useState } from "react";

export default function AddItem() {
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Uploaded PDF:", resumeFile);

    // Clear form
    setTitle("");
    setResumeFile(null);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        {/* Custom styled file input */}
        <label
          htmlFor="fileInput"
          className="block bg-gray-200 hover:bg-gray-300 text-black font-medium px-4 py-2 rounded cursor-pointer w-fit"
        >
          {resumeFile ? "Change File" : "Choose PDF File"}
        </label>
        <input
          id="fileInput"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {resumeFile && (
          <p className="text-sm text-gray-600">Selected: {resumeFile.name}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
