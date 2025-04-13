"use client";

import { useState } from "react";

export default function AddItem() {
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [generalItem, setGeneralItem] = useState({
    title: "",
    description: "",
  });

  const [items, setItems] = useState<
    { title: string; description: string }[]
  >([]);

  // Resume logic
  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleResumeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Resume Title:", title);
    console.log("PDF File:", resumeFile);
    setTitle("");
    setResumeFile(null);
  };

  // General item logic
  const handleGeneralChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGeneralItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("General Item Submitted:", generalItem);
    setItems((prev) => [...prev, generalItem]); // ⬅️ Adds to preview list
    setGeneralItem({ title: "", description: "" });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md space-y-10">
      {/* Upload Resume Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
        <form onSubmit={handleResumeSubmit} className="space-y-4">
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
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
            onChange={handleResumeFileChange}
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

      {/* General Item Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Add Items</h2>
        <form onSubmit={handleGeneralSubmit} className="space-y-4">
          <input
            name="title"
            value={generalItem.title}
            onChange={handleGeneralChange}
            placeholder="Item Title"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <textarea
            name="description"
            value={generalItem.description}
            onChange={handleGeneralChange}
            placeholder="Item Description"
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Item
          </button>
        </form>
      </div>

      {/* 🔍 Preview Section */}
      {items.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Items List</h2>
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li
                key={index}
                className="border border-gray-200 rounded p-3 bg-gray-50"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
