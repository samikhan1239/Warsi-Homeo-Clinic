"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Skeleton } from "../../../../../components/ui/skeleton";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isNaN(id)) {
      toast.error("Invalid course ID");
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/student/courses/${id}`, {
          timeout: 5000,
        });
        console.log("CourseDetails: Fetched course", res.data);
        setCourse(res.data);
      } catch (error) {
        console.error("CourseDetails: Error fetching course", {
          message: error.message,
          response: error.response?.data,
        });
        const message =
          error.response?.data?.message || "Error fetching course";
        toast.error(message);
        if (error.response?.status === 401) {
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="py-8">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600">
          Course not found or you are not enrolled.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Toaster />
      <h2 className="text-3xl font-bold text-green-700 mb-8">{course.title}</h2>
      <Card className="shadow-lg border border-gray-200">
        <div className="relative h-48">
          {course.imageUrl ? (
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-t-lg"
              onError={() =>
                console.error("Failed to load image:", course.imageUrl)
              }
            />
          ) : (
            <Skeleton className="h-full w-full rounded-t-lg" />
          )}
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">
            {course.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <p className="text-gray-600">
            <strong>Level:</strong> {course.level || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Duration:</strong>{" "}
            {course.duration ? `${course.duration} weeks` : "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Category:</strong> {course.category || "N/A"}
          </p>
          <div className="mt-6">
            <Link href={`/dashboard/student/videos/${course.id}`}>
              <Button className="bg-green-600 text-white hover:bg-green-700">
                View Videos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
