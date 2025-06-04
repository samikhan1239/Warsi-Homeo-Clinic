"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Calendar, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    level: "",
    category: "",
    file: null,
  });
  const [customCategory, setCustomCategory] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/admin/courses");
        console.log("Courses component: Fetched courses", res.data);
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Courses component: Error fetching courses", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        toast.error("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = "Course title is required";
    if (!form.description.trim())
      errors.description = "Description is required";
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill all required fields");
      console.log("Courses component: Form validation failed", errors);
      return;
    }

    setSubmitLoading(true);
    setSuccessMessage("");
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("duration", form.duration);
      formData.append("level", form.level);
      // Use customCategory if "Other" is selected and customCategory is non-empty
      const categoryValue =
        form.category === "Other" && customCategory.trim()
          ? customCategory.trim()
          : form.category;
      formData.append("category", categoryValue);
      if (form.file) formData.append("file", form.file);

      const res = await axios.post("/api/admin/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Courses component: Course added successfully", res.data);
      setCourses([...courses, res.data]);
      setForm({
        title: "",
        description: "",
        duration: "",
        level: "",
        category: "",
        file: null,
      });
      setCustomCategory("");
      setImagePreview(null);
      setFormErrors({});
      setSuccessMessage("Course added successfully!");
      toast.success("Course added");

      // Optional: Send email notification using Resend (uncomment to enable)
      /*
      try {
        const emailRes = await axios.post("/api/send-email", {
          to: "admin@yourdomain.com", // Replace with actual admin email
          subject: "New Course Added",
          html: `<p>Course "${form.title}" has been added successfully.</p>`,
        });
        console.log("Courses component: Email sent successfully", emailRes.data);
      } catch (emailError) {
        console.error("Courses component: Error sending email", {
          message: emailError.message,
          response: emailError.response?.data,
        });
      }
      */
    } catch (error) {
      console.error("Courses component: Error adding course", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error(error.response?.data?.message || "Error adding course");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/courses?id=${id}`);
      console.log(
        `Courses component: Course with ID ${id} deleted successfully`
      );
      setCourses(courses.filter((course) => course.id !== id));
      toast.success("Course deleted");
    } catch (error) {
      console.error("Courses component: Error deleting course", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error(error.response?.data?.message || "Error deleting course");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading Courses...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-green-700">
            Manage Courses
          </h1>
          <Card className="mb-8 rounded-lg border border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-semibold text-green-700">
                <Calendar className="mr-2 h-6 w-6 text-green-600" />
                Add New Course
              </CardTitle>
            </CardHeader>
            <CardContent>
              {successMessage && (
                <p className="mb-4 text-green-600">{successMessage}</p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-green-700">
                    Course Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter course title"
                    value={form.title}
                    onChange={handleInputChange}
                    className={`border-gray-200 focus:ring-green-600 ${formErrors.title ? "border-red-600" : ""}`}
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.title}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="description" className="text-green-700">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Enter course description"
                    value={form.description}
                    onChange={handleInputChange}
                    className={`border-gray-200 focus:ring-green-600 ${formErrors.description ? "border-red-600" : ""}`}
                  />
                  {formErrors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.description}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="duration" className="text-green-700">
                    Duration (weeks)
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    placeholder="Enter duration in weeks"
                    value={form.duration}
                    onChange={handleInputChange}
                    className="border-gray-200 focus:ring-green-600"
                  />
                </div>
                <div>
                  <Label htmlFor="level" className="text-green-700">
                    Level
                  </Label>
                  <Select
                    name="level"
                    value={form.level}
                    onValueChange={(value) =>
                      setForm({ ...form, level: value })
                    }
                  >
                    <SelectTrigger className="border-gray-200 focus:ring-green-600">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category" className="text-green-700">
                    Category
                  </Label>
                  <Select
                    name="category"
                    value={form.category}
                    onValueChange={(value) => {
                      setForm({ ...form, category: value });
                      if (value !== "Other") setCustomCategory("");
                    }}
                  >
                    <SelectTrigger className="border-gray-200 focus:ring-green-600">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Homeopathy Basics">
                        Homeopathy Basics
                      </SelectItem>
                      <SelectItem value="Advanced Remedies">
                        Advanced Remedies
                      </SelectItem>
                      <SelectItem value="Clinical Practice">
                        Clinical Practice
                      </SelectItem>
                      <SelectItem value="Herbal Medicine">
                        Herbal Medicine
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {form.category === "Other" && (
                  <div>
                    <Label htmlFor="customCategory" className="text-green-700">
                      Specify Category
                    </Label>
                    <Input
                      id="customCategory"
                      name="customCategory"
                      placeholder="Enter custom category"
                      value={customCategory}
                      onChange={handleCustomCategoryChange}
                      className="border-gray-200 focus:ring-green-600"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="file" className="text-green-700">
                    Course Thumbnail
                  </Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border-gray-200 focus:ring-green-600"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <Image
                        src={imagePreview}
                        alt="Course thumbnail preview"
                        width={128} // 32 * 4 = 128px (matches h-32, w-32)
                        height={128}
                        className="rounded-lg border border-gray-200 object-cover"
                      />
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  className="flex items-center bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400"
                  disabled={submitLoading}
                >
                  {submitLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {submitLoading ? "Adding Course..." : "Add Course"}
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">
                No courses found.
              </p>
            ) : (
              courses.map((course) => (
                <Card
                  key={course.id}
                  className="rounded-lg border border-gray-200 shadow-lg transition hover:bg-green-50"
                >
                  <CardContent className="p-4">
                    {course.imageUrl && (
                      <Image
                        src={course.imageUrl}
                        alt={course.title}
                        width={300} // Adjust based on your design (e.g., 300px for a typical card width)
                        height={192} // 48 * 4 = 192px (matches h-48)
                        className="mb-4 rounded-lg object-cover"
                      />
                    )}
                    <h3 className="text-xl font-bold text-green-700">
                      {course.title}
                    </h3>
                    <p className="text-gray-600">{course.description}</p>
                    <p className="mt-2 text-gray-600">
                      <strong>Duration:</strong> {course.duration || "N/A"}{" "}
                      weeks
                    </p>
                    <p className="text-gray-600">
                      <strong>Level:</strong> {course.level || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Category:</strong> {course.category || "N/A"}
                    </p>
                    <Button
                      onClick={() => handleDelete(course.id)}
                      className="mt-4 bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
