"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import Image from "next/image";

export default function Diseases() {
  const [diseases, setDiseases] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    symptoms: "",
    remedies: "",
    precautions: "",
    file: null,
    videoLink: "",
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await axios.get("/api/admin/diseases");
        setDiseases(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Fetch diseases error:", error);
        toast.error(error.response?.data?.message || "Error fetching diseases");
      } finally {
        setLoading(false);
      }
    };
    fetchDiseases();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.name) {
        toast.error("Please enter a disease name");
        return;
      }

      // Validate YouTube URL if provided
      if (
        form.videoLink &&
        !form.videoLink.match(
          /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.*$/
        )
      ) {
        toast.error("Invalid YouTube URL");
        return;
      }

      // Validate file size (Cloudinary free plan: 100MB limit for unsigned uploads)
      if (form.file && form.file.size > 100 * 1024 * 1024) {
        toast.error("File size must be less than 100MB");
        return;
      }

      setUploading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      if (form.description) formData.append("description", form.description);
      if (form.symptoms) formData.append("symptoms", form.symptoms);
      if (form.remedies) formData.append("remedies", form.remedies);
      if (form.precautions) formData.append("precautions", form.precautions);
      if (form.file) formData.append("file", form.file);
      if (form.videoLink) formData.append("videoLink", form.videoLink);

      const res = await axios.post("/api/admin/diseases", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDiseases([...diseases, res.data]);
      setForm({
        name: "",
        description: "",
        symptoms: "",
        remedies: "",
        precautions: "",
        file: null,
        videoLink: "",
      });
      toast.success("Disease added successfully");
    } catch (error) {
      console.error("Add disease error:", error);
      toast.error(error.response?.data?.message || "Error adding disease");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/diseases?id=${id}`);
      setDiseases(diseases.filter((disease) => disease.id !== id));
      toast.success("Disease deleted successfully");
    } catch (error) {
      console.error("Delete disease error:", error);
      toast.error(error.response?.data?.message || "Error deleting disease");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading diseases...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
            Manage Diseases
          </h1>
          <Card className="shadow-xl rounded-lg border border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-600 flex items-center">
                <Calendar className="h-6 w-6 mr-2" />
                Add New Disease
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                disabled={uploading}
              >
                <Input
                  placeholder="Disease Name (Required)"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border-gray-300 focus:border-green-600"
                  disabled={uploading}
                />
                <Textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="border-gray-300 focus:border-green-600"
                  disabled={uploading}
                />
                <Textarea
                  placeholder="Symptoms"
                  value={form.symptoms}
                  onChange={(e) =>
                    setForm({ ...form, symptoms: e.target.value })
                  }
                  className="border-gray-300 focus:border-green-600"
                  disabled={uploading}
                />
                <Textarea
                  placeholder="Homeopathic Remedies"
                  value={form.remedies}
                  onChange={(e) =>
                    setForm({ ...form, remedies: e.target.value })
                  }
                  className="border-gray-300 focus:border-green-600"
                  disabled={uploading}
                />
                <Textarea
                  placeholder="Medicine"
                  value={form.precautions}
                  onChange={(e) =>
                    setForm({ ...form, precautions: e.target.value })
                  }
                  className="border-gray-300 focus:border-green-600"
                  disabled={uploading}
                />
                <Input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) =>
                    setForm({ ...form, file: e.target.files[0] })
                  }
                  className="border-gray-300 focus:border-green-600"
                  disabled={uploading}
                />
                <Input
                  placeholder="External Video Link (e.g., YouTube)"
                  value={form.videoLink}
                  onChange={(e) =>
                    setForm({ ...form, videoLink: e.target.value })
                  }
                  className="border-gray-300 focus:border-green-600"
                  disabled={uploading}
                />
                {form.file && (
                  <div className="mt-4">
                    {form.file.type.startsWith("image/") ? (
                      <Image
                        src={URL.createObjectURL(form.file)}
                        alt="Preview"
                        width={300} // Adjust based on your design
                        height={200} // Adjust based on your design
                        className="max-w-full h-auto rounded-lg"
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(form.file)}
                        controls
                        className="max-w-full h-auto rounded-lg"
                      />
                    )}
                  </div>
                )}
                {uploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div
                      className="bg-green-600 h-2.5 rounded-full animate-pulse"
                      style={{
                        width: "100%",
                        transition: "width 2s ease-in-out",
                      }}
                    ></div>
                  </div>
                )}
                <Button
                  type="submit"
                  className="bg-green-600 text-white hover:bg-green-700"
                  disabled={uploading || !form.name}
                >
                  {uploading ? "Uploading..." : "Add Disease"}
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {diseases.length === 0 ? (
              <p className="text-gray-600 text-center col-span-full">
                No diseases found.
              </p>
            ) : (
              diseases.map((disease) => (
                <Card
                  key={disease.id}
                  className="shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-green-600">
                      {disease.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {disease.videoUrl &&
                    disease.videoUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                      <Image
                        src={disease.videoUrl}
                        alt={disease.name}
                        width={300} // Adjust based on your design (e.g., typical card width)
                        height={160} // 40 * 4 = 160px (matches h-40)
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                    ) : disease.videoUrl ? (
                      <video
                        src={disease.videoUrl}
                        controls
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                    ) : null}
                    {disease.description && (
                      <p className="text-gray-700 mb-2">
                        <strong>Description:</strong> {disease.description}
                      </p>
                    )}
                    {disease.symptoms && (
                      <p className="text-gray-700 mb-2">
                        <strong>Symptoms:</strong> {disease.symptoms}
                      </p>
                    )}
                    {disease.remedies && (
                      <p className="text-gray-700 mb-2">
                        <strong>Remedies:</strong> {disease.remedies}
                      </p>
                    )}
                    {disease.precautions && (
                      <p className="text-gray-700 mb-2">
                        <strong>Precautions:</strong> {disease.precautions}
                      </p>
                    )}
                    {disease.videoUrl && (
                      <a
                        href={disease.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline block mb-2"
                      >
                        View Uploaded Media
                      </a>
                    )}
                    {disease.videoLink && (
                      <a
                        href={disease.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline block mb-2"
                      >
                        View External Video (e.g., YouTube)
                      </a>
                    )}
                    <Button
                      onClick={() => handleDelete(disease.id)}
                      className="mt-4 bg-red-500 text-white hover:bg-red-600"
                      disabled={uploading}
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
