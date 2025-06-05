"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import "animate.css";

const HeroSection = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[85vh] lg:h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner2.jpg" // Ensure this matches the path to your saved image
            alt="Dr. Warsi Homeopathy Banner"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
            className="transform transition-transform duration-1000 ease-out hover:scale-105"
          />
          {/* Overlay for better readability (optional, since image has good contrast) */}
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col items-end justify-end px-6 md:px-12 lg:px-16 pb-10">
          {/* Animated Button */}
          <Link
            href="/login"
            className="bg-blue-600 text-white text-sm md:text-base px-6 py-3 rounded-full font-medium shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
