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
      id: Date.now(), // Use timestamp for unique ID
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
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resume List</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-white bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </header>

      {/* List of items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4 flex flex-col items-center"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={150}
              height={150}
              className="rounded"
            />
            <p className="mt-2 font-semibold">{item.title}</p>
            <button
              onClick={() => handleDelete(item.id)}
              className="mt-2 text-sm text-white bg-red-600 px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add item form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Add Item
        </button>
      </form>
    </div>
  );
}
