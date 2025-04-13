"use client";

import { useState } from "react";
import Card from "./Card";
import Button from "./Button";
import styles from "./Signup.module.css";

export default function Signup({ onAddUser }: { onAddUser: (user: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) return;
    
    onAddUser(formData);
    setFormData({ name: "", username: "", email: "", password: "", imageUrl: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-3">
      <Card className={`${styles.input} w-full max-w-lg p-3 bg-white shadow-md rounded-md`}>
        <h1 className="text-4xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={handleSubmit}>
          {["name", "username", "email", "password", "imageUrl"].map((field) => (
            <div key={field}>
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}
          <Button type="submit">Sign Up</Button>
        </form>
      </Card>
    </div>
  );
}
