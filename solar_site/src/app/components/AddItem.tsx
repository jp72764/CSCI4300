// Inside AddItem.tsx
"use client";

import React, { useState } from "react";

interface AddItemProps {
  onUpload: (title: string, file: File, content: string, role: string) => void;
}

export default function AddItem({ onUpload }: AddItemProps) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      if (!file) {
          alert("Please select a file");
          return;
      }
      const reader = new FileReader(); // reads the file data to get the content.
      reader.onload = async (upload) => {
          const fileContent = upload?.target?.result;
          onUpload(title, file, fileContent as string, role);  // changed the onUpload to include the fileContent
      }
      reader.readAsText(file);

    // Reset form fields after submission
    setTitle("");
    setFile(null);
    setRole("");
  };

  return (
    <div className="bg-white rounded shadow p-6 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Upload Resume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            File
          </label>
          <input
            type="file"
            id="file"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            id="role"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
