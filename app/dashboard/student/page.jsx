"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user info from token
        const userRes = await axios.get("/api/auth/me");
        setUser(userRes.data);

        // Fetch enrolled courses
        const coursesRes = await axios.get("/api/student/courses");
        console.log("StudentDashboard: Fetched courses", coursesRes.data);
        setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
      } catch (error) {
        console.error("StudentDashboard: Error fetching data", {
          message: error.message,
          response: error.response?.data,
        });
        toast.error(error.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("StudentDashboard: Error logging out", {
        message: error.message,
        response: error.response?.data,
      });
      toast.error("Error logging out");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-10 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">
            Student Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-gray-600">Welcome, {user.name}</span>
            )}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center text-green-600 border-green-600 hover:bg-green-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Your Enrolled Courses
        </h2>
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <p className="text-gray-600 text-center">
            No courses enrolled. Explore available courses!
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Link key={course.id} href={`/student/courses/${course.id}`}>
                <Card className="shadow-lg border border-gray-200 hover:bg-green-50 transition-transform transform hover:scale-105">
                  {course.imageUrl && (
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      width={300} // Adjust based on your design (e.g., typical card width)
                      height={160} // Matches h-40 (40 * 4 = 160px)
                      className="h-40 w-full object-cover rounded-t-lg"
                    />
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-green-700">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-2">
                      {course.description}
                    </p>
                    <p className="text-gray-600 mt-2">
                      <strong>Level:</strong> {course.level || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Duration:</strong>{" "}
                      {course.duration ? `${course.duration} weeks` : "N/A"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
