"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "../../../../components/ui/button";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all"); // Default to all appointments

  const filters = [
    { key: "all", label: "All" },
    { key: "APPROVED", label: "Approved" },
    { key: "PENDING", label: "Pending" },
    { key: "REJECTED", label: "Rejected" },
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/patient/appointments");
        const data = Array.isArray(res.data) ? res.data : [];
        setAppointments(data);
        setFilteredAppointments(data); // Initialize with all appointments
      } catch (error) {
        console.error("Fetch appointments error:", error);
        toast.error(
          error.response?.data?.message || "Error fetching appointments"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    // Filter appointments based on activeFilter
    if (activeFilter === "all") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter((appt) => appt.status === activeFilter)
      );
    }
  }, [activeFilter, appointments]);

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "APPROVED":
        return "text-green-600 bg-green-50 border-green-200";
      case "REJECTED":
        return "text-red-500 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            My Appointments
          </h1>
          <nav className="flex justify-center space-x-4 sm:space-x-6 mb-8 border-b border-gray-200 pb-3">
            {filters.map((filter) => (
              <Button
                key={filter.key}
                variant="ghost"
                onClick={() => setActiveFilter(filter.key)}
                className={`text-base sm:text-lg font-medium transition-all duration-200 relative ${
                  activeFilter === filter.key
                    ? "text-green-600 after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-[2px] after:bg-green-600"
                    : "text-gray-600 hover:text-green-700"
                } ${
                  filter.key === "APPROVED"
                    ? "md:bg-green-50 md:font-bold md:px-4 md:rounded-md"
                    : ""
                }`}
                aria-current={activeFilter === filter.key ? "page" : undefined}
              >
                {filter.label}
              </Button>
            ))}
          </nav>
          <div className="space-y-6">
            {filteredAppointments.length === 0 ? (
              <p className="text-gray-500 text-center text-lg">
                No{" "}
                {activeFilter === "all"
                  ? "appointments"
                  : activeFilter.toLowerCase() + " appointments"}{" "}
                found.
              </p>
            ) : (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      Appointment #{appointment.id}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <p>
                      <strong className="font-medium">Name:</strong>{" "}
                      {appointment.firstName} {appointment.lastName}
                    </p>
                    <p>
                      <strong className="font-medium">Email:</strong>{" "}
                      {appointment.email}
                    </p>
                    <p>
                      <strong className="font-medium">Phone:</strong>{" "}
                      {appointment.phone}
                    </p>
                    <p>
                      <strong className="font-medium">Date:</strong>{" "}
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong className="font-medium">Time:</strong>{" "}
                      {appointment.time}
                    </p>
                    <p className="sm:col-span-2">
                      <strong className="font-medium">Reason:</strong>{" "}
                      {appointment.reason}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
