// go to http://localhost:3000/dashboard to see this page
'use client';
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Item = {
  id: number;
  title: string;
  image: string;
};

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, title: "Sample Resume 1", image: "/resumes/sample1.png" },
    { id: 2, title: "Sample Resume 2", image: "/resumes/sample2.png" },
    { id: 3, title: "Sample Resume 3", image: "/resumes/sample3.png" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      title: newTitle,
      image: newImage || "/resumes/sample1.png",
    };
    setItems([...items, newItem]);
    setNewTitle("");
    setNewImage("");
    console.log("New item added:", newItem);
  };

  const handleDelete = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    console.log("Item deleted:", id);
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-pink-200 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">Your Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 py-8">
        {/* Item Grid */}
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
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-2 text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Add Item Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 bg-white rounded shadow w-full max-w-md"
        >
          <h2 className="text-xl font-semibold text-center">Add New Resume</h2>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-2 rounded bg-white"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            className="border p-2 rounded bg-white"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500 py-2 rounded"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
