"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import { Button } from "../../../components/ui/button";

export default function StudentLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        console.log("StudentLayout: Fetched user", res.data);
        setUser(res.data);
      } catch (error) {
        console.error("StudentLayout: Error fetching user", {
          message: error.message,
          response: error.response?.data,
        });
        toast.error("Session expired. Please log in again.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("StudentLayout: Error logging out", {
        message: error.message,
        response: error.response?.data,
      });
      toast.error("Error logging out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
      <Sidebar role={user.role} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8 md:pl-72">
          {children}
        </main>
      </div>
    </div>
  );
}
