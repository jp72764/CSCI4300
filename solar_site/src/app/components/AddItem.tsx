"use client";

import { useState } from "react";
let pdfjsLib: any = null;

if (typeof window !== "undefined") {
  (async () => {
    const pdfjs = await import("pdfjs-dist/build/pdf");
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf-worker.js";
    pdfjsLib = pdfjs;
  })();
}

export default function AddItem() {
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  {/*}
  const [generalItem, setGeneralItem] = useState({ title: "", description: "" });
  const [items, setItems] = useState<{ title: string; description: string }[]>([]);
  */}

  const handleResumeFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      const text = await extractTextFromPDF(file);
      setExtractedText(text);
      console.log("Extracted text:", text);
      if (!text || text.trim() === "") {
        console.warn("⚠️ PDF text was empty or only whitespace.");
      } else {
        console.log("✅ PDF text extracted:", text.slice(0, 300));
      }
      

    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
  
    // Wait for pdfjsLib to be ready
    while (!pdfjsLib) {
      await new Promise((res) => setTimeout(res, 50));
    }
  
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
  
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str);
      fullText += strings.join(" ") + "\n";
    }
  
    return fullText;
  };
  

  const getFeedback = async (resumeText: string) => {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText }),
    });

    const data = await res.json();
    return data.result;
  };

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!extractedText) {
      alert("No resume text extracted.");
      return;
    }
    setLoading(true);
    const response = await getFeedback(extractedText);
    setFeedback(response);
    setLoading(false);
    setTitle("");
    setResumeFile(null);
  };

  {/*}
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setItems((prev) => [...prev, generalItem]);
    setGeneralItem({ title: "", description: "" });
  };
  */}

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md space-y-10">
      {/* Resume Upload */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Upload Resume (PDF)</h2>
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
            {loading ? "Analyzing..." : "Get Feedback"}
          </button>
        </form>

        {feedback && (
          <div className="mt-4 p-4 border border-blue-400 bg-blue-50 rounded text-sm whitespace-pre-wrap">
            <h3 className="font-semibold mb-2">AI Feedback:</h3>
            {feedback}
          </div>
        )}
      </div>

      {/* General Items Section */} {/*
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
      </div> */}

      {/* Item List */}
      {/*}
      {items.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Items List</h2>
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={index} className="border border-gray-200 rounded p-3 bg-gray-50">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
        */}
    </div>
  );
}
