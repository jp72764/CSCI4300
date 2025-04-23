'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import AddItem from "@/app/components/AddItem";
import Card from "@/app/components/Card";
import Link from "next/link";

type Resume = {
  id: number;
  title: string;
  fileName: string;
  role: string;
  feedback?: string;
  editing?: boolean;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [uploadedResumes, setUploadedResumes] = useState<Resume[]>([]);
  const [editingTitle, setEditingTitle] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const userName = session?.user?.name || session?.user?.email?.split("@")[0];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const handleResumeUpload = (title: string, file: File, role: string) => {
    const id = Date.now();
    const newResume: Resume = {
      id,
      title,
      fileName: file.name,
      role,
    };
    setUploadedResumes((prev) => [...prev, newResume]);
  };

  const handleDeleteResume = (id: number) => {
    setUploadedResumes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleGetFeedback = async (resume: Resume) => {
    setLoadingId(resume.id);

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
      prev.map((r) => (r.id === resume.id ? { ...r, feedback: data.feedback } : r))
    );

    setLoadingId(null);
  };

  const toggleEditing = (id: number, currentTitle: string) => {
    setEditingTitle(currentTitle);
    setUploadedResumes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, editing: true } : r))
    );
  };

  const updateResumeTitle = (id: number) => {
    setUploadedResumes((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, title: editingTitle, editing: false } : r
      )
    );
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
        <div className="text-center">
          <h1 className="text-xl font-bold">
            Welcome to the Dashboard, {userName}
          </h1>
        </div>
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
            <Card key={resume.id} className="p-4 flex flex-col justify-between background: bg-white">
              {resume.editing ? (
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={() => updateResumeTitle(resume.id)}
                  className="text-center text-lg font-semibold border border-gray-300 px-2 py-1 rounded w-full"
                  autoFocus
                />
              ) : (
                <div
                  className="flex items-center justify-center gap-2 cursor-pointer group"
                  onClick={() => toggleEditing(resume.id, resume.title)}
                  title="Click to edit title"
                >
                  <h3 className="font-semibold text-lg text-center">
                    {resume.title}
                  </h3>
                </div>
              )}

              <p className="text-sm text-center text-gray-500 mb-2">{resume.fileName}</p>
              <p className="text-xs text-center italic text-gray-400">Role: {resume.role}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleGetFeedback(resume)}
                  className={`text-sm px-3 py-1 rounded text-white ${
                    loadingId === resume.id
                      ? "bg-gray-400 cursor-wait"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                  disabled={loadingId === resume.id}
                >
                  {loadingId === resume.id ? "Getting feedback..." : "Get Feedback"}
                </button>
                <button
                  onClick={() => handleDeleteResume(resume.id)}
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
            </Card>
          ))}
        </div>s
      </div>
    </div>
  );
}
