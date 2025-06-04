"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "../../../../components/ui/input"; // Capitalized and verified path
import { Button } from "../../../../components/ui/button"; // Capitalized and verified path
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card"; // Capitalized and verified path
import { Skeleton } from "../../../../components/ui/skeleton"; // Added for loading state
import { Label } from "../../../../components/ui/label"; // Added for accessibility

// Force dynamic rendering to handle server-side cookie access

export default function AdminProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/auth/profile");
        setName(res.data.name || "");
        setEmail(res.data.email || "");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const validateForm = () => {
    const newErrors = { name: "", email: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the form errors");
      return;
    }

    setSubmitting(true);
    try {
      await axios.put("/api/auth/profile", { name, email });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Skeleton className="h-10 w-64 mb-6" />
        <Card>
          <CardContent className="space-y-4 pt-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Admin Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Update Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              {submitting ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
