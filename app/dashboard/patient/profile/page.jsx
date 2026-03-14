"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, User, Lock } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";

export default function PatientProfile() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/auth/profile");
        setForm({ name: res.data.name || "", email: res.data.email || "" });
      } catch (error) {
        console.error("Fetch profile error:", error);
        toast.error(error.response?.data?.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!passwordForm.currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters";
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      await axios.put("/api/auth/profile", form);
      toast.success("Profile updated successfully");
      setErrors({});
    } catch (error) {
      console.error("Update profile error:", error);
      const errorData = error.response?.data;
      if (errorData?.errors) {
        setErrors(errorData.errors);
      } else {
        toast.error(error.response?.data?.message || "Error updating profile");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    try {
      setPasswordSubmitting(true);
      await axios.put("/api/auth/password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success("Password updated successfully");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({});
    } catch (error) {
      console.error("Update password error:", error);
      const errorData = error.response?.data;
      if (errorData?.errors) {
        setPasswordErrors(errorData.errors);
      } else {
        toast.error(error.response?.data?.message || "Error updating password");
      }
    } finally {
      setPasswordSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswordForm({ ...passwordForm, [field]: value });
    if (passwordErrors[field])
      setPasswordErrors({ ...passwordErrors, [field]: null });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md bg-white shadow-md rounded-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800 text-center">
                  Patient Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <label htmlFor="name" className="sr-only">
                      Full Name
                    </label>
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="pl-10 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      aria-label="Full name"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Change Password
                  </h3>
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div className="relative">
                      <label htmlFor="current-password" className="sr-only">
                        Current Password
                      </label>
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="Current Password"
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          handlePasswordInputChange(
                            "currentPassword",
                            e.target.value
                          )
                        }
                        className="pl-10 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        aria-label="Current password"
                      />
                      {passwordErrors.currentPassword && (
                        <p className="mt-2 text-sm text-red-600">
                          {passwordErrors.currentPassword}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <label htmlFor="new-password" className="sr-only">
                        New Password
                      </label>
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="New Password"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          handlePasswordInputChange(
                            "newPassword",
                            e.target.value
                          )
                        }
                        className="pl-10 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        aria-label="New password"
                      />
                      {passwordErrors.newPassword && (
                        <p className="mt-2 text-sm text-red-600">
                          {passwordErrors.newPassword}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <label htmlFor="confirm-password" className="sr-only">
                        Confirm New Password
                      </label>
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm New Password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          handlePasswordInputChange(
                            "confirmPassword",
                            e.target.value
                          )
                        }
                        className="pl-10 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        aria-label="Confirm new password"
                      />
                      {passwordErrors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-600">
                          {passwordErrors.confirmPassword}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={passwordSubmitting}
                      className="w-full py-3 px-4 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {passwordSubmitting ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
