"use client";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, role } = res.data;

      if (!["PATIENT", "STUDENT", "ADMIN"].includes(role)) {
        toast.error("Invalid user role");
        setLoading(false);
        return;
      }

      document.cookie = `token=${token}; path=/`;

      if (role === "ADMIN") router.push("/dashboard/admin");
      else if (role === "PATIENT") router.push("/dashboard/patient");
      else if (role === "STUDENT") router.push("/dashboard/student");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section with Image and Info for Large Screens */}
          <div className="relative hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&h=800&q=80"
              alt="Homeopathic Clinic"
              width={1400} // Matches w=1400 in the URL
              height={800} // Matches h=800 in the URL
              className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-white text-4xl font-bold leading-tight drop-shadow-lg">
                Embrace Natural Healing
              </h2>
              <p className="text-gray-100 mt-3 text-lg font-medium drop-shadow-md">
                Discover personalized homeopathic care at Warsi Homeo Clinic.
              </p>
            </div>
          </div>

          {/* Medium Screen Section with Banner */}
          <div className="lg:hidden block relative">
            <div className="relative">
              <Image
                src="/banner.jpg"
                alt="Warsi Homeo Clinic Banner"
                width={600} // Adjust based on your design (e.g., typical banner width)
                height={170} // Matches h-[170px]
                className="w-full h-[170px] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center"></div>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md bg-white border border-gray-200 shadow-2xl rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl text-center text-gray-800 font-bold">
                  Warsi Homeo Clinic
                </CardTitle>
                <p className="mt-2 text-sm text-center text-gray-600">
                  Or{" "}
                  <Link
                    href="/register"
                    className="text-green-600 hover:underline font-medium"
                  >
                    create a new account
                  </Link>
                </p>
              </CardHeader>
              <CardContent className="space-y-6 mt-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 py-5 text-base border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 py-5 text-base border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    Remember me
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-green-600 hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-5 text-lg bg-green-600 hover:bg-green-700 text-white rounded-lg transition-transform transform hover:scale-105"
                >
                  <LogIn className="inline mr-2 h-5 w-5" />
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
