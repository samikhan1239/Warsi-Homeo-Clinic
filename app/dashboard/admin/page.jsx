"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { Users, BookOpen, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ patients: 0, students: 0 });
  const [users, setUsers] = useState({ patients: [], students: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats
        const statsRes = await axios.get("/api/admin/users");
        const statsData = statsRes.data;

        if (!statsData || typeof statsData !== "object") {
          throw new Error("Invalid stats API response");
        }

        // Fetch detailed user data
        const detailsRes = await axios.get("/api/admin/users/details");
        const detailsData = detailsRes.data;

        if (!detailsData || typeof detailsData !== "object") {
          throw new Error("Invalid details API response");
        }

        // Ensure patients and students are arrays
        const patients = Array.isArray(detailsData.patients)
          ? detailsData.patients
          : [];
        const students = Array.isArray(detailsData.students)
          ? detailsData.students
          : [];

        setStats({
          patients: statsData.patients || patients.length,
          students: statsData.students || students.length,
        });
        setUsers({
          patients,
          students,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(error.response?.data?.message || "Failed to fetch data");
        setUsers({ patients: [], students: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Admin Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white shadow-xl rounded-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-green-600 flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  Total Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-gray-800">
                  {stats.patients}
                </p>
                <Link href="/dashboard/admin/patients">
                  <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                    View Patients
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-xl rounded-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-green-600 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2" />
                  Total Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-gray-800">
                  {stats.students}
                </p>
                <Link href="/dashboard/admin/students">
                  <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                    View Students
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Patients List */}
          <Card className="bg-white shadow-xl rounded-lg border border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-600 flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              {users.patients.length === 0 ? (
                <p className="text-gray-600 text-center">No patients found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Appointments</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.patients.map((patient) => (
                      <TableRow key={patient.id} className="hover:bg-gray-50">
                        <TableCell>{patient.id}</TableCell>
                        <TableCell>{patient.name || "N/A"}</TableCell>
                        <TableCell>{patient.email}</TableCell>
                        <TableCell>
                          {patient.appointments?.length || 0}
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/dashboard/admin/appointments?userId=${patient.id}`}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <Calendar className="h-4 w-4 mr-1" />
                              View Appointments
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

          {/* Students List */}
          <Card className="bg-white shadow-xl rounded-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-600 flex items-center">
                <BookOpen className="h-6 w-6 mr-2" />
                Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              {users.students.length === 0 ? (
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
                    {users.students.map((student) => (
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
