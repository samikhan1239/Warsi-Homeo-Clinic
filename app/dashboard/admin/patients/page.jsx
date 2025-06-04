"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { Users, Calendar } from "lucide-react";
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

export default function AdminPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("/api/admin/users/details");
        const patients = Array.isArray(res.data.patients)
          ? res.data.patients
          : [];
        setPatients(patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch patients"
        );
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading patients...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Manage Patients
          </h1>
          <Card className="bg-white shadow-xl rounded-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-600 flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              {patients.length === 0 ? (
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
                    {patients.map((patient) => (
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
        </div>
      </div>
    </div>
  );
}
