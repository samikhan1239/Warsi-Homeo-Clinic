"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("/api/admin/users/details");
        const students = Array.isArray(res.data.students)
          ? res.data.students
          : [];
        setStudents(students);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch students"
        );
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading students...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Manage Students
          </h1>
          <Card className="bg-white shadow-xl rounded-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-600 flex items-center">
                <BookOpen className="h-6 w-6 mr-2" />
                Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              {students.length === 0 ? (
                <p className="text-gray-600 text-center">No students found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Courses Enrolled</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50">
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name || "N/A"}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.courses?.length || 0}</TableCell>
                        <TableCell>
                          <Link
                            href={`/dashboard/admin/students/${student.id}/courses`}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <BookOpen className="h-4 w-4 mr-1" />
                              View Courses
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
