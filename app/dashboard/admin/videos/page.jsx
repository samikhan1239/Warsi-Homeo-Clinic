"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, Video } from "lucide-react";
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
import { Checkbox } from "../../../../components/ui/checkbox";

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    courseId: "",
    lectureNumber: "",
    description: "",
    duration: "",
    videoLink: "",
    isFree: false,
    file: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videosRes, coursesRes] = await Promise.all([
          axios.get("/api/admin/videos"),
          axios.get("/api/admin/courses"),
        ]);
        console.log("AdminVideos: Fetched videos", videosRes.data);
        console.log("AdminVideos: Fetched courses", coursesRes.data);
        setVideos(Array.isArray(videosRes.data) ? videosRes.data : []);
        setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
      } catch (error) {
        console.error("AdminVideos: Error fetching data", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        toast.error(error.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = "Video title is required";
    if (!form.courseId) errors.courseId = "Course selection is required";
    if (!form.videoLink && !form.file)
      errors.video = "Either a video link or file is required";
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, file });
    setFormErrors({ ...formErrors, video: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill all required fields");
      console.log("AdminVideos: Form validation failed", errors);
      return;
    }

    setSubmitLoading(true);
    setSuccessMessage("");
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("courseId", form.courseId);
      formData.append("lectureNumber", form.lectureNumber || "");
      formData.append("description", form.description || "");
      formData.append("duration", form.duration || "");
      formData.append("videoLink", form.videoLink || "");
      formData.append("isFree", form.isFree.toString());
      if (form.file) formData.append("file", form.file);

      const res = await axios.post("/api/admin/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("AdminVideos: Video added successfully", res.data);
      setVideos([...videos, res.data]);
      setForm({
        title: "",
        courseId: "",
        lectureNumber: "",
        description: "",
        duration: "",
        videoLink: "",
        isFree: false,
        file: null,
      });
      setFormErrors({});
      setSuccessMessage("Video added successfully!");
      toast.success("Video added");
    } catch (error) {
      console.error("AdminVideos: Error adding video", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error(error.response?.data?.message || "Error adding video");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/videos?id=${id}`);
      console.log(`AdminVideos: Video with ID ${id} deleted successfully`);
      setVideos(videos.filter((video) => video.id !== id));
      toast.success("Video deleted");
    } catch (error) {
      console.error("AdminVideos: Error deleting video", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error(error.response?.data?.message || "Error deleting video");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading videos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
          Manage Videos
        </h1>
        <Card className="shadow-lg rounded-lg border border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-green-700 flex items-center">
              <Video className="h-6 w-6 mr-2 text-green-600" />
              Add New Video
            </CardTitle>
          </CardHeader>
          <CardContent>
            {successMessage && (
              <p className="text-green-600 mb-4">{successMessage}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-green-700">
                  Video Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter video title"
                  value={form.title}
                  onChange={handleInputChange}
                  className={`border-gray-200 focus:ring-green-600 ${formErrors.title ? "border-red-600" : ""}`}
                />
                {formErrors.title && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.title}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="videoLink" className="text-green-700">
                  Video Link (e.g., YouTube)
                </Label>
                <Input
                  id="videoLink"
                  name="videoLink"
                  placeholder="Enter external video URL"
                  value={form.videoLink}
                  onChange={handleInputChange}
                  className={`border-gray-200 focus:ring-green-600 ${formErrors.video ? "border-red-600" : ""}`}
                />
                {formErrors.video && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.video}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="file" className="text-green-700">
                  Upload Video File
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className={`border-gray-200 focus:ring-green-600 ${formErrors.video ? "border-red-600" : ""}`}
                />
                {formErrors.video && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.video}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="courseId" className="text-green-700">
                  Course
                </Label>
                <Select
                  name="courseId"
                  value={form.courseId}
                  onValueChange={(value) => {
                    setForm({ ...form, courseId: value });
                    setFormErrors({ ...formErrors, courseId: "" });
                  }}
                >
                  <SelectTrigger
                    className={`border-gray-200 focus:ring-green-600 ${formErrors.courseId ? "border-red-600" : ""}`}
                  >
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.courseId && (
                  <p className="text-red-600 text-sm mt-1">
                    {formErrors.courseId}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lectureNumber" className="text-green-700">
                  Lecture Number
                </Label>
                <Input
                  id="lectureNumber"
                  name="lectureNumber"
                  type="number"
                  placeholder="Enter lecture number"
                  value={form.lectureNumber}
                  onChange={handleInputChange}
                  className="border-gray-200 focus:ring-green-600"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-green-700">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Enter video description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="border-gray-200 focus:ring-green-600"
                />
              </div>
              <div>
                <Label htmlFor="duration" className="text-green-700">
                  Duration (minutes)
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  placeholder="Enter duration in minutes"
                  value={form.duration}
                  onChange={handleInputChange}
                  className="border-gray-200 focus:ring-green-600"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFree"
                  checked={form.isFree}
                  onCheckedChange={(checked) =>
                    setForm({ ...form, isFree: checked })
                  }
                />
                <Label htmlFor="isFree" className="text-green-700">
                  Free Access
                </Label>
              </div>
              <Button
                type="submit"
                className="flex items-center bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400"
                disabled={submitLoading}
              >
                {submitLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {submitLoading ? "Adding Video..." : "Add Video"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">
              No videos found.
            </p>
          ) : (
            videos.map((video) => (
              <Card
                key={video.id}
                className="shadow-lg rounded-lg border border-gray-200 hover:bg-green-50 transition"
              >
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-green-700">
                    {video.title}
                  </h3>
                  <p className="text-gray-600">
                    <strong>Course:</strong>{" "}
                    {video.course ? video.course.title : "No course assigned"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Lecture:</strong>{" "}
                    {video.lectureNumber || "Not specified"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Duration:</strong>{" "}
                    {video.duration ? `${video.duration} min` : "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Free:</strong> {video.isFree ? "Yes" : "No"}
                  </p>
                  {video.description && (
                    <p className="text-gray-600 mt-2">{video.description}</p>
                  )}
                  {video.url && (
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      Watch on Cloudinary
                    </a>
                  )}
                  {video.videoLink && (
                    <a
                      href={video.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline ml-4"
                    >
                      Watch on Youtube
                    </a>
                  )}
                  <Button
                    onClick={() => handleDelete(video.id)}
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
  );
}
