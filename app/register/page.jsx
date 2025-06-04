"use client";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  User,
  UserPlus,
  Leaf,
  Heart,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", {
        email,
        password,
        name,
        role,
      });
      if (!["PATIENT", "STUDENT", "ADMIN"].includes(res.data.role)) {
        throw new Error("Invalid role returned from server");
      }
      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Clinic Features for Large Screens */}
          <div className="hidden lg:block">
            <Card className="bg-white border border-gray-200 shadow-2xl rounded-2xl">
              <CardHeader>
                <div className="flex items-center mb-6">
                  <Image
                    src="/logo.jpg"
                    alt="Warsi Homeo Clinic Logo"
                    width={64} // Matches h-16 (16 * 4 = 64px)
                    height={64} // Assuming square logo; adjust if needed
                    className="h-16 mr-4"
                  />
                  <CardTitle className="text-3xl font-bold text-gray-800">
                    Why Join Warsi Homeo Clinic?
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-green-50 p-3 rounded-full mr-4">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Natural Treatments
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Gentle, non-invasive homeopathic remedies tailored to you.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-50 p-3 rounded-full mr-4">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Personalized Care
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Customized treatment plans for your unique health needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-50 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Expert Practitioners
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Certified homeopaths with years of experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-50 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Flexible Scheduling
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Convenient appointment booking to fit your schedule.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Medium Screen Section with Banner */}
          <div className="lg:hidden block relative">
            <div className="relative">
              <Image
                src="/banner.jpg"
                alt="Warsi Homeo Clinic Banner"
                width={600} // Adjust based on your design (e.g., typical banner width)
                height={180} // Matches h-[180px]
                className="w-full h-[180px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Registration Form */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md bg-white border border-gray-200 shadow-2xl rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/logo.jpg"
                    alt="Warsi Homeo Clinic Logo"
                    width={64} // Matches h-16 (16 * 4 = 64px)
                    height={64} // Assuming square logo; adjust if needed
                    className="h-16"
                  />
                </div>
                <CardTitle className="text-3xl text-center text-gray-800 font-bold">
                  Join Warsi Homeo Clinic
                </CardTitle>
                <p className="mt-2 text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-green-600 hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </CardHeader>
              <CardContent className="space-y-6 mt-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12 py-5 text-base border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 py-5 text-base border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all"
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
                    className="pl-12 py-5 text-base border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
                <div className="relative border-gray-300">
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-12 pr-8 py-5  text-base border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-all "
                  >
                    <option value="PATIENT">Patient</option>
                    <option value="STUDENT">Student</option>
                    <option value="ADMIN">Administrator</option>
                  </select>
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-5 text-lg bg-green-600 hover:bg-green-700 text-white rounded-lg transition-transform transform hover:scale-105 shadow-sm"
                >
                  <UserPlus className="inline mr-2 h-5 w-5" />
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
