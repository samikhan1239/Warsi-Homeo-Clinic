"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";

export default function StudentProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/auth/profile");
        console.log("StudentProfile: Fetched profile", res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (error) {
        console.error("StudentProfile: Error fetching profile", {
          message: error.message,
          response: error.response?.data,
        });
        toast.error(error.response?.data?.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/auth/profile", { name, email });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("StudentProfile: Error updating profile", {
        message: error.message,
        response: error.response?.data,
      });
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
          <p className="text-gray-600 text-lg font-medium">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500 mb-2">
            <Link href="/dashboard/student" className="hover:text-green-600">
              Dashboard
            </Link>{" "}
            <span className="text-green-600">Profile</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700">
            Student Profile
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border-gray-300 focus:border-green-600 focus:ring-green-600"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border-gray-300 focus:border-green-600 focus:ring-green-600"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 text-white hover:bg-green-700"
            >
              Update Profile
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
