"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ChevronLeft, PlayCircle } from "lucide-react";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { Button } from "../../../../../components/ui/button";

export default function StudentVideos() {
  const [videos, setVideos] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videosRes, courseRes] = await Promise.all([
          axios.get(`/api/student/videos?courseId=${courseId}`),
          axios.get(`/api/student/courses/${courseId}`),
        ]);
        console.log("StudentVideos: Fetched videos", videosRes.data);
        console.log("StudentVideos: Fetched course", courseRes.data);
        setVideos(Array.isArray(videosRes.data) ? videosRes.data : []);
        setCourse(courseRes.data);
      } catch (error) {
        console.error("StudentVideos: Error fetching data", {
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
  }, [courseId]);

  const renderVideoPlayer = (video) => {
    if (video.url) {
      // Cloudinary video
      return (
        <video
          controls
          className="w-full h-48 sm:h-64 md:h-80 rounded-lg object-cover"
          src={video.url}
          poster={video.url.replace(/\.mp4$/, ".jpg")}
        >
          Your browser does not support the video tag.
        </video>
      );
    } else if (video.videoLink) {
      // YouTube or external link
      const youtubeId = video.videoLink.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
      )?.[1];
      if (youtubeId) {
        return (
          <iframe
            className="w-full h-48 sm:h-64 md:h-80 rounded-lg"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
      return (
        <a
          href={video.videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline flex items-center"
        >
          <PlayCircle className="h-5 w-5 mr-2" />
          Watch Video Externally
        </a>
      );
    }
    return <p className="text-gray-600">No video source available.</p>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-1/2 mb-6" />
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <nav className="text-sm text-gray-500 mb-2 py-8">
              <Link href="/dashboard/student" className="hover:text-green-600">
                Dashboard
              </Link>{" "}
              &gt;{" "}
              <Link
                href="/dashboard/student/courses"
                className="hover:text-green-600"
              >
                Courses
              </Link>{" "}
              &gt; <span className="text-green-600">Videos</span>
            </nav>
          </div>
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/dashboard/student/courses/${courseId}`)
            }
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 ">
        {videos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No videos available for this course.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Check back later or contact an admin.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">{renderVideoPlayer(video)}</div>
                  <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-green-700 mb-2">
                        {index + 1}. {video.title}
                      </h2>
                      {video.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {video.description}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm">
                        <strong>Lecture:</strong>{" "}
                        {video.lectureNumber || "Not specified"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <strong>Duration:</strong>{" "}
                        {video.duration ? `${video.duration} min` : "N/A"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <strong>Access:</strong>{" "}
                        {video.isFree ? "Free" : "Premium"}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                        onClick={() =>
                          document
                            .getElementById(`video-${video.id}`)
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                      >
                        Play Video
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
