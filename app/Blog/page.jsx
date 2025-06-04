"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Clock, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  const [email, setEmail] = useState("");

  const categories = ["All", "Homeopathy", "Wellness", "Nutrition", "Remedies"];

  const blogPosts = [
    {
      id: "1",
      title: "Boost Your Immunity Naturally",
      excerpt:
        "Discover the top homeopathic remedies to strengthen your immune system.",
      image:
        "https://images.pexels.com/photos/16159904/pexels-photo-16159904/free-photo-of-glass-of-water-and-bottle-of-pills-on-table.jpeg",
      category: "Wellness",
      author: "Dr. Anjali Sharma",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "Homeopathy for Stress Relief",
      excerpt: "Learn how homeopathy can help manage stress and anxiety.",
      image:
        "https://images.pexels.com/photos/5726791/pexels-photo-5726791.jpeg",
      category: "Homeopathy",
      author: "Dr. Rajiv Mehta",
      readTime: "4 min read",
    },
    {
      id: "3",
      title: "Natural Remedies for Allergies",
      excerpt:
        "Explore effective homeopathic treatments for seasonal allergies.",
      image:
        "https://images.pexels.com/photos/3865794/pexels-photo-3865794.jpeg",
      category: "Remedies",
      author: "Dr. Priya Verma",
      readTime: "6 min read",
    },
  ];

  const handleNewsletterSubmit = () => {
    if (email.trim()) {
      alert(`Subscribed with ${email}`);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* YouTube Channel Banner */}
        <div className="w-full mb-6">
          <div className="w-full overflow-hidden rounded-xl shadow-xl">
            <Image
              src="/banner.jpg"
              alt="YouTube Banner"
              width={1200} // Specify appropriate width
              height={200} // Match the h-[200px] or h-[500px] based on your design
              className="w-full h-[200px] md:h-[500px] object-cover"
            />
          </div>

          {/* Visit Button */}
          <div className="text-center mt-6">
            <a
              href="https://www.youtube.com/@drwarsihomeopathy"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-700 transition"
            >
              Visit Our YouTube Channel
            </a>
          </div>
        </div>

        {/* YouTube Shorts Section */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
            Featured YouTube Shorts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "Natural Remedy for Dry Cough",
                videoId: "u5aCUb5idgI",
              },
              { id: 2, title: "Skin Whitening", videoId: "N3boKti0OOI" },
              { id: 3, title: "Thyroid", videoId: "/e8lyO_m6tMk" },
            ].map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-md p-4">
                <iframe
                  className="w-full aspect-video rounded-md"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Health & Wellness Blog
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest insights in homeopathic medicine and
            holistic health.
          </p>
        </div>

        {/* Blog Categories */}
        <div className="flex overflow-x-auto mb-8 pb-2 -mx-4 px-4 md:px-0 md:mx-0">
          <div className="flex space-x-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  index === 0
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-green-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Blog Post */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <Image
                src="https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg"
                alt="Featured post"
                width={600} // Adjust based on your design
                height={400} // Adjust based on your design
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-green-600 font-medium mb-4">
                Featured Article
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                The Future of Homeopathic Medicine
              </h2>
              <p className="text-gray-600 mb-6">
                How natural remedies are shaping the future of healthcare.
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <User className="h-4 w-4 mr-2" />
                <span className="mr-4">Dr. Sarah Johnson</span>
                <Calendar className="h-4 w-4 mr-2" />
                <span className="mr-4">March 16, 2024</span>
                <Clock className="h-4 w-4 mr-2" />
                <span>8 min read</span>
              </div>
              <Link
                href="/blog/featured"
                className="inline-flex items-center text-green-600 font-medium hover:text-green-700"
              >
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400} // Adjust based on your design
                  height={192} // Match the h-48 (48 * 4 = 192px)
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="h-4 w-4 mr-2" />
                  <span className="mr-4">{post.author}</span>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-green-600 font-medium hover:text-green-700"
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-24 bg-green-50 rounded-xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-6">
              Get the latest articles and health tips directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleNewsletterSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
