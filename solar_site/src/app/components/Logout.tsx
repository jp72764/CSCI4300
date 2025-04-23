"use client";

import { useRouter } from "next/navigation";
import { signOut } from '@/auth'; 

export default function LogoutButton() {
    const router = useRouter();
    
    const handleLogout = async () => {
        await signOut({ redirect: true, redirectTo: '/' }); 
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
