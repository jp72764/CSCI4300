"use client";

import { useRouter } from "next/navigation";
import { signOut } from '@/auth'; // Import signOut
// Remember to create this component in your main components folder.
export default function LogoutButton() {
    const router = useRouter();
    
    const handleLogout = async () => {
        await signOut({ redirect: true, redirectTo: '/' }); // Redirect to home page after logout
    };

    return (
        <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white font-semibold hover:bg-red-700 py-2 rounded"
        >
            Logout
        </button>
    );
}
