"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Calendar } from "lucide-react";
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
import { sendEmail } from "../../../../lib/email";

export default function AdminAppointments() {
  const [fullAppointments, setFullAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/api/admin/appointments");
        console.log("Appointments data:", res.data); // Debug
        const data = Array.isArray(res.data) ? res.data : [];
        setFullAppointments(data);
        setAppointments(data);
      } catch (error) {
        console.error("Fetch appointments error:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch appointments"
        );
        setFullAppointments([]);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (statusFilter) {
      setAppointments(
        fullAppointments.filter((app) => app.status === statusFilter)
      );
    } else {
      setAppointments(fullAppointments);
    }
  }, [statusFilter, fullAppointments]);

  const handleApprove = async (id, email, appointment) => {
    try {
      const res = await axios.patch("/api/admin/appointments", {
        id,
        status: "APPROVED",
      });
      console.log("Approve response:", res.data); // Debug
      await sendEmail(
        email,
        "Appointment Approved",
        `
          <p>Dear ${appointment.firstName} ${appointment.lastName || ""},</p>
          <p>Your appointment has been approved.</p>
          <p><strong>Date:</strong> ${formatDate(appointment.date)}</p>
          <p><strong>Time:</strong> ${appointment.time || "N/A"}</p>
          <p><strong>Reason:</strong> ${appointment.reason || "N/A"}</p>
          <p>Thank you for choosing WARSI HOMOEO CLINIC.</p>
        `
      );
      const updatedAppointments = fullAppointments.map((app) =>
        app.id === id ? { ...app, status: "APPROVED" } : app
      );
      setFullAppointments(updatedAppointments);
      setAppointments(
        statusFilter
          ? updatedAppointments.filter((app) => app.status === statusFilter)
          : updatedAppointments
      );
      toast.success("Appointment approved");
    } catch (error) {
      console.error("Approve error:", error);
      toast.error(
        error.response?.data?.message || "Error approving appointment"
      );
    }
  };

  const handleReject = async (id, email, appointment) => {
    try {
      const res = await axios.patch("/api/admin/appointments", {
        id,
        status: "REJECTED",
      });
      console.log("Reject response:", res.data); // Debug
      await sendEmail(
        email,
        "Appointment Rejected",
        `
          <p>Dear ${appointment.firstName} ${appointment.lastName || ""},</p>
          <p>Your appointment has been rejected.</p>
          <p><strong>Date:</strong> ${formatDate(appointment.date)}</p>
          <p><strong>Time:</strong> ${appointment.time || "N/A"}</p>
          <p><strong>Reason:</strong> ${appointment.reason || "N/A"}</p>
          <p>Please contact us to reschedule or for further assistance.</p>
        `
      );
      const updatedAppointments = fullAppointments.map((app) =>
        app.id === id ? { ...app, status: "REJECTED" } : app
      );
      setFullAppointments(updatedAppointments);
      setAppointments(
        statusFilter
          ? updatedAppointments.filter((app) => app.status === statusFilter)
          : updatedAppointments
      );
      toast.success("Appointment rejected");
    } catch (error) {
      console.error("Reject error:", error);
      toast.error(
        error.response?.data?.message || "Error rejecting appointment"
      );
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-wedding">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
            Manage Appointments
          </h1>
          <Card className="shadow-xl rounded-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-600 flex items-center">
                <Calendar className="h-6 w-6 mr-2" />
                Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <Button
                  onClick={() => setStatusFilter(null)}
                  variant={statusFilter === null ? "default" : "outline"}
                  className={
                    statusFilter === null
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "text-green-600 border-green-600 hover:bg-green-50"
                  }
                  size="sm"
                >
                  All
                </Button>
                <Button
                  onClick={() => setStatusFilter("PENDING")}
                  variant={statusFilter === "PENDING" ? "default" : "outline"}
                  className={
                    statusFilter === "PENDING"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "text-green-600 border-green-600 hover:bg-green-50"
                  }
                  size="sm"
                >
                  Pending
                </Button>
                <Button
                  onClick={() => setStatusFilter("APPROVED")}
                  variant={statusFilter === "APPROVED" ? "default" : "outline"}
                  className={
                    statusFilter === "APPROVED"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "text-green-600 border-green-600 hover:bg-green-50"
                  }
                  size="sm"
                >
                  Approved
                </Button>
              </div>
              {appointments.length === 0 ? (
                <p className="text-gray-600 text-center">
                  No appointments found.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow
                        key={appointment.id}
                        className="hover:bg-gray-50"
                      >
                        <TableCell>
                          {`${appointment.firstName} ${appointment.lastName || ""}`.trim() ||
                            "N/A"}
                        </TableCell>
                        <TableCell>{formatDate(appointment.date)}</TableCell>
                        <TableCell>{appointment.time || "N/A"}</TableCell>
                        <TableCell>{appointment.reason || "N/A"}</TableCell>
                        <TableCell>
                          <button
                            onClick={() => setStatusFilter(appointment.status)}
                            className={`inline-flex items-center px-2 py-1 rounded-lg text-sm font-medium underline cursor-pointer ${
                              appointment.status === "APPROVED"
                                ? "bg-green-100 text-green-800 hover:text-green-600"
                                : appointment.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800 hover:text-yellow-600"
                                  : "bg-red-100 text-red-800 hover:text-red-600"
                            }`}
                          >
                            {appointment.status}
                          </button>
                        </TableCell>
                        <TableCell>
                          {appointment.status === "PENDING" && (
                            <div className="flex gap-2">
                              <Button
                                onClick={() =>
                                  handleApprove(
                                    appointment.id,
                                    appointment.email,
                                    appointment
                                  )
                                }
                                className="bg-green-600 text-white hover:bg-green-700"
                                size="sm"
                              >
                                Approve
                              </Button>
                              <Button
                                onClick={() =>
                                  handleReject(
                                    appointment.id,
                                    appointment.email,
                                    appointment
                                  )
                                }
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                size="sm"
                              >
                                Reject
                              </Button>
                            </div>
                          )}
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
