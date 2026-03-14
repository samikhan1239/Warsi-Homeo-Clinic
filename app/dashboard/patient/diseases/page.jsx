"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "../../../../components/ui/input";
import { useDebounce } from "use-debounce";
import Image from "next/image";

export default function PatientDiseases() {
  const [diseases, setDiseases] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500); // Debounce search input
  const [loading, setLoading] = useState(true);
  const [activeField, setActiveField] = useState("name"); // Default to name

  const fields = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "symptoms", label: "Symptoms" },
    { key: "remedies", label: "Remedies" },
    { key: "precautions", label: "Medicine" },
  ];

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/patient/diseases", {
          params: { search: debouncedSearch },
        });
        setDiseases(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Fetch diseases error:", error);
        toast.error(error.response?.data?.message || "Error fetching diseases");
      } finally {
        setLoading(false);
      }
    };
    fetchDiseases();
  }, [debouncedSearch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md">
          <p className="text-gray-600 text-center mb-4">Loading diseases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
            Explore Diseases
          </h1>
          <Input
            placeholder="Search diseases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-8 max-w-md mx-auto border-gray-300 focus:border-green-600"
          />
          <nav className="flex justify-center space-x-4 mb-6 border-b border-gray-200 pb-2">
            {fields.map((field) => (
              <button
                key={field.key}
                onClick={() => setActiveField(field.key)}
                className={`text-lg font-medium transition-colors duration-200 ${
                  activeField === field.key
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-green-700"
                }`}
                aria-current={activeField === field.key ? "page" : undefined}
              >
                {field.label}
              </button>
            ))}
          </nav>
          <div className="space-y-6">
            {diseases.length === 0 ? (
              <p className="text-gray-600 text-center">No diseases found.</p>
            ) : (
              diseases.map((disease) => (
                <div
                  key={disease.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                >
                  <h2 className="text-2xl font-semibold text-green-600 mb-2">
                    {disease.name}
                  </h2>
                  <div className="mb-4">
                    {disease.videoUrl ? (
                      <a
                        href={disease.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 font-medium mr-4"
                      >
                        Watch Video
                      </a>
                    ) : disease.videoLink ? (
                      <a
                        href={disease.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 font-medium mr-4"
                      >
                        Watch on YouTube
                      </a>
                    ) : (
                      <span className="text-gray-500 font-medium mr-4">
                        None
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    {activeField === "name" ? (
                      <p className="text-gray-700 pl-4 border-l-2 border-green-600"></p>
                    ) : disease[activeField] ? (
                      <p className="text-gray-700 pl-4 border-l-2 border-green-600">
                        {disease[activeField]}
                      </p>
                    ) : (
                      <p className="text-gray-500 italic pl-4">
                        No {activeField} available.
                      </p>
                    )}
                    {activeField === "description" &&
                      (disease.videoUrl || disease.videoLink) && (
                        <div className="mt-4 pl-4">
                          {disease.videoUrl &&
                          disease.videoUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                            <Image
                              src={disease.videoUrl}
                              alt={disease.name}
                              fill
                              style={{ objectFit: "cover" }}
                              className="rounded-md"
                            />
                          ) : disease.videoUrl ? (
                            <video
                              src={disease.videoUrl}
                              controls
                              className="w-full max-w-md h-auto rounded-md"
                            />
                          ) : null}
                          {disease.videoLink && (
                            <a
                              href={disease.videoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-700 block mt-2"
                            >
                              Watch on YouTube
                            </a>
                          )}
                        </div>
                      )}
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
