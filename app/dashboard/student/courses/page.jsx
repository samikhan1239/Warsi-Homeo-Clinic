"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Skeleton } from "../../../../components/ui/skeleton";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/student/courses?all=true");
        console.log("AllCourses: Fetched courses", res.data);
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("AllCourses: Error fetching courses", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        toast.error(error.response?.data?.message || "Error fetching courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    setEnrolling({ ...enrolling, [courseId]: true });
    try {
      await axios.post("/api/student/enroll", { courseId });
      console.log(`AllCourses: Enrolled in course ${courseId}`);
      toast.success("Enrolled successfully! Check your dashboard.");
      setCourses(
        courses.map((c) => (c.id === courseId ? { ...c, isEnrolled: true } : c))
      );
    } catch (error) {
      console.error("AllCourses: Error enrolling", {
        message: error.message,
        response: error.response?.data,
      });
      toast.error(error.response?.data?.message || "Error enrolling");
    } finally {
      setEnrolling({ ...enrolling, [courseId]: false });
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-8 py-8">
        All Available Courses
      </h2>
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">No courses available.</p>
          <p className="text-gray-500 text-sm">
            Contact an admin to add courses or check back later.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="shadow-lg border border-gray-200 hover:bg-green-50 transition-transform transform hover:scale-105"
            >
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
                <div className="mt-4 flex space-x-2">
                  <Link href={`/dashboard/student/courses/${course.id}`}>
                    <Button
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      View Details
                    </Button>
                  </Link>
                  {course.isEnrolled ? (
                    <Button
                      disabled
                      className="bg-green-600 text-white opacity-50 cursor-not-allowed"
                    >
                      Enrolled
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleEnroll(course.id)}
                      className="bg-green-600 text-white hover:bg-green-700"
                      disabled={enrolling[course.id]}
                    >
                      {enrolling[course.id] ? "Enrolling..." : "Enroll Now"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
