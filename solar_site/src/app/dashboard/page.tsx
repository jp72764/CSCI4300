'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import AddItem from "@/app/components/AddItem";
import Link from "next/link";

type Resume = {
  _id: string; // Changed id to _id to match MongoDB
  title: string;
  fileName: string;
  content: string;
  role: string;
  feedback?: string;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [uploadedResumes, setUploadedResumes] = useState<Resume[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null); // Changed to string
  const [editingId, setEditingId] = useState<string | null>(null); // State to track which resume is being edited
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (status === "authenticated") {
        // Fetch resumes from the database
        fetchResumes();
    }
  }, [status, router]);

  const fetchResumes = async () => {
      try {
          const res = await fetch('/api/resume'); //Route is /api/resume as discussed earlier.
          if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
          const data = await res.json();
          setUploadedResumes(data);
      } catch (error) {
          console.error("Error fetching resumes:", error);
      }
  };

    const handleResumeUpload = async (title: string, file: File, content: string, role: string) => {
        try {
            const res = await fetch('/api/resume', { // Changed route to api/resume as discussed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: session?.user?.id,
                    title: title,
                    fileName: file.name,
                    content: content,
                    role: role
                })
            });

            if (!res.ok) {
                // Try to parse the error message from the response
                let errorMessage = `Resume upload failed with status: ${res.status}`;
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.message || errorMessage; // Use the message from JSON if available
                } catch (parseError) {
                    // If JSON parsing fails, keep the original error message
                    console.error("Failed to parse error JSON", parseError);
                }
                throw new Error(errorMessage);
            }

            fetchResumes(); // Refresh the resume list

        } catch (error: any) { // Ensure 'error' is typed as 'any' or 'Error'
            console.error("Error uploading resume:", error);
        }
    };

  const handleGetFeedback = async (resume: Resume) => {
    setLoadingId(resume._id);

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: resume.title,
        role: resume.role,
      }),
    });

    const data = await res.json();

    setUploadedResumes((prev) =>
      prev.map((r) => (r._id === resume._id ? { ...r, feedback: data.feedback } : r))
    );

    setLoadingId(null);
  };

  const handleUpdateTitle = async (resume: Resume) => {
      try {
          const res = await fetch('/api/resume', { // Route changed to api/resume
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  id: resume._id,
                  title: newTitle // Send the new title
              })
          });

          if (res.ok) {
              setUploadedResumes(prev =>
                  prev.map(r =>
                      r._id === resume._id ? { ...r, title: newTitle } : r
                  )
              );
              setEditingId(null); // Clear editing state
              setNewTitle(""); // Clear input field
          } else {
              console.error("Title update failed");
          }
      } catch (error) {
          console.error("Error updating title:", error);
      }
  };

    const handleDeleteResume = async (id: string) => {
        try {
            const res = await fetch('/api/feedback', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (res.ok) {
                setUploadedResumes(prev => prev.filter(r => r._id !== id));
            } else {
                console.error("Resume deletion failed");
            }
        } catch (error) {
            console.error("Error deleting resume:", error);
        }
    };

  const handleLogout = () => {
    signOut({ callbackUrl: "/signin" });
 };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-pink-200">
      <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/cartoon.webp" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-black">SOLAR</span>
        </Link>
        <h1 className="text-xl font-bold">
          Welcome to the Dashboard{session?.user?.name ? `, ${session.user.name}` : ""}!
        </h1>

        <button
          onClick={handleLogout}
          className="text-sm bg-yellow-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-col items-center justify-center py-10 px-4">
        <AddItem onUpload={handleResumeUpload} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-6xl w-full">
          {uploadedResumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white rounded shadow p-4 flex flex-col justify-between"
            >
              {editingId === resume._id ? (
                  <div>
                      <input
                          type="text"
                          className="w-full p-2 border rounded mb-2"
                          defaultValue={resume.title}
                          onChange={(e) => setNewTitle(e.target.value)}
                      />
                      <div className="flex justify-end">
                          <button
                              onClick={() => handleUpdateTitle(resume)}
                              className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                          >
                              Save
                          </button>
                          <button
                              onClick={() => setEditingId(null)}
                              className="text-sm bg-gray-300 text-gray-700 px-3 py-1 rounded"
                          >
                              Cancel
                          </button>
                      </div>
                  </div>
              ) : (
                  <h3 className="font-semibold text-lg text-center">{resume.title}</h3>
              )}
              <p className="text-sm text-center text-gray-500 mb-2">{resume.fileName}</p>
              <p className="text-xs text-center italic text-gray-400">Role: {resume.role}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleGetFeedback(resume)}
                  className={`text-sm px-3 py-1 rounded text-white ${
                    loadingId === resume._id
                      ? "bg-gray-400 cursor-wait"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                  disabled={loadingId === resume._id}
                >
                  {loadingId === resume._id ? "Getting feedback..." : "Get Feedback"}
                </button>
                  <button
                      onClick={() => {
                          setEditingId(resume._id);
                          setNewTitle(resume.title);
                      }}
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                      Edit Title
                  </button>
                <button
                  onClick={() => handleDeleteResume(resume._id)}
                  className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

              {resume.feedback && (
                <div className="mt-4 text-sm bg-gray-100 p-3 rounded border">
                  <strong>Feedback:</strong>
                  <p className="mt-1 whitespace-pre-line">{resume.feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
