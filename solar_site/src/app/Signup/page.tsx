'use client';
import Signup from "@/app/components/Signup";

export default function SignupPage() {
  const handleAddUser = (user: any) => {
    console.log("User registered:", user);
    // Here you could also call an API to save the user
  };

  return <Signup onAddUser={handleAddUser} />;
}
