"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../components/ui/tabs";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
    customReason: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [activeTab, setActiveTab] = useState("all");

  const availableTimes = ["07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"];

  const reasonOptions = [
    "Consultation",
    "Chekup",
    "Follow-up",

    "Chronic Pain",
    "Autoimmune Disorder",
    "Mental Health",
    "General Consultation",
    "Other",
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/api/patient/appointments");
        setAppointments(res.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch appointments"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    const {
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      reason,
      customReason,
    } = formData;

    if (!firstName) errors.firstName = "First Name is required";
    if (!lastName) errors.lastName = "Last Name is required";
    if (!email) errors.email = "Email is required";
    if (!phone) errors.phone = "Phone Number is required";
    if (!date) errors.date = "Date is required";
    if (!time) errors.time = "Time is required";
    if (!reason) errors.reason = "Reason for visit is required";
    if (reason === "Other" && !customReason)
      errors.customReason = "Please specify the reason";

    return errors;
  };

  const handleBookAppointment = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill in all required fields");
      return;
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      reason,
      customReason,
    } = formData;
    const finalReason = reason === "Other" ? customReason : reason;

    try {
      await axios.post("/api/patient/appointments", {
        firstName,
        lastName,
        email,
        phone,
        date: new Date(`${date}T${time.split(" ")[0]}`).toISOString(),
        time,
        reason: finalReason,
      });
      toast.success("Appointment request sent to admin for approval");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        reason: "",
        customReason: "",
      });
      setFormErrors({});
      const res = await axios.get("/api/patient/appointments");
      setAppointments(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to book appointment"
      );
      console.error("Booking error:", error.response?.data || error);
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

  const filteredAppointments = appointments.filter((appt) => {
    if (activeTab === "approved") return appt.status === "APPROVED";
    if (activeTab === "pending") return appt.status === "PENDING";
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            My Appointments
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Booking Form */}
            <div>
              <Card className="bg-white shadow-xl rounded-lg border border-gray-200 mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-green-600">
                    Your Physician
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Image
                    src="/mamu.jpg"
                    alt="Dr. Sarah Johnson"
                    width={128} // Matches w-32 (32 * 4 = 128px)
                    height={128} // Matches h-32 (32 * 4 = 128px)
                    className="rounded-full object-cover mb-4"
                  />
                  <h3 className="text-xl font-medium text-gray-800">
                    Dr. Tahir Mohammad Warsi
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Chief Homeopathic Physician
                  </p>
                  <p className="text-gray-700 text-center">
                    Dr. Tahir Mohammad Warsi is a renowned homeopathic physician
                    with over 15 years of experience specializing in chronic
                    diseases, autoimmune disorders, and mental health. Fluent in
                    English and Hindi, she provides compassionate care at WARSI
                    HOMOEO CLINIC.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-xl rounded-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-green-600">
                    Book a New Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="pl-10 py-3 text-base border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          />
                        </div>
                        {formErrors.firstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Last Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="pl-10 py-3 text-base border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          />
                        </div>
                        {formErrors.lastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.lastName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 py-3 text-base border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          />
                        </div>
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10 py-3 text-base border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          />
                        </div>
                        {formErrors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Appointment Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Select Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="pl-10 py-3 text-base border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          />
                        </div>
                        {formErrors.date && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.date}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="time"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Select Time
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <select
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all appearance-none"
                          >
                            <option value="">Select time slot</option>
                            {availableTimes.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                        {formErrors.time && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.time}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Reason for Visit */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Reason for Visit
                    </h3>
                    <div>
                      <label
                        htmlFor="reason"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Select Reason
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all appearance-none"
                        >
                          <option value="">Select reason</option>
                          {reasonOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      {formErrors.reason && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.reason}
                        </p>
                      )}
                    </div>
                    {formData.reason === "Other" && (
                      <div>
                        <label
                          htmlFor="customReason"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Specify Reason
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <textarea
                            id="customReason"
                            name="customReason"
                            rows={4}
                            value={formData.customReason}
                            onChange={handleInputChange}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            placeholder="Describe your symptoms or reason for consultation..."
                          />
                        </div>
                        {formErrors.customReason && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.customReason}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleBookAppointment}
                    className="w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-transform"
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Appointments List */}
            <Card className="bg-white shadow-xl rounded-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-green-600">
                  Your Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="approved"
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                      Approved
                    </TabsTrigger>
                    <TabsTrigger
                      value="pending"
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                      Pending
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    {filteredAppointments.length === 0 ? (
                      <p className="text-gray-600 text-center">
                        No appointments found.
                      </p>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <Card
                          key={appointment.id}
                          className="mb-4 bg-white shadow-md rounded-md border border-gray-200"
                        >
                          <CardContent className="p-4">
                            <p className="text-gray-700">
                              <strong>Date:</strong>{" "}
                              {formatDate(appointment.date)}
                            </p>
                            <p className="text-gray-700">
                              <strong>Time:</strong> {appointment.time || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <strong>Doctor:</strong> Dr. Sarah Johnson
                            </p>
                            <p className="text-gray-700">
                              <strong>Status:</strong>{" "}
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                                  appointment.status === "APPROVED"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {appointment.status}
                              </span>
                            </p>
                            <p className="text-gray-700">
                              <strong>Reason:</strong>{" "}
                              {appointment.reason || "N/A"}
                            </p>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>
                  <TabsContent value="approved">
                    {filteredAppointments.length === 0 ? (
                      <p className="text-gray-600 text-center">
                        No approved appointments found.
                      </p>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <Card
                          key={appointment.id}
                          className="mb-4 bg-white shadow-md rounded-md border border-gray-200"
                        >
                          <CardContent className="p-4">
                            <p className="text-gray-700">
                              <strong>Date:</strong>{" "}
                              {formatDate(appointment.date)}
                            </p>
                            <p className="text-gray-700">
                              <strong>Time:</strong> {appointment.time || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <strong>Doctor:</strong> Dr. Sarah Johnson
                            </p>
                            <p className="text-gray-700">
                              <strong>Status:</strong>{" "}
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                {appointment.status}
                              </span>
                            </p>
                            <p className="text-gray-700">
                              <strong>Reason:</strong>{" "}
                              {appointment.reason || "N/A"}
                            </p>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>
                  <TabsContent value="pending">
                    {filteredAppointments.length === 0 ? (
                      <p className="text-gray-600 text-center">
                        No pending appointments found.
                      </p>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <Card
                          key={appointment.id}
                          className="mb-4 bg-white shadow-md rounded-md border border-gray-200"
                        >
                          <CardContent className="p-4">
                            <p className="text-gray-700">
                              <strong>Date:</strong>{" "}
                              {formatDate(appointment.date)}
                            </p>
                            <p className="text-gray-700">
                              <strong>Time:</strong> {appointment.time || "N/A"}
                            </p>
                            <p className="text-gray-700">
                              <strong>Doctor:</strong> Dr. Sarah Johnson
                            </p>
                            <p className="text-gray-700">
                              <strong>Status:</strong>{" "}
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                {appointment.status}
                              </span>
                            </p>
                            <p className="text-gray-700">
                              <strong>Reason:</strong>{" "}
                              {appointment.reason || "N/A"}
                            </p>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-center text-gray-600">
            <p>
              Need to reschedule or cancel? Please contact us at least 24 hours
              in advance.
            </p>
            <p className="mt-2">
              For urgent matters, please call us directly at +1 (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
