import React from "react";
import Link from "next/link";
import { CheckCircle, Award, Users, Clock } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  const milestones = [
    {
      year: "2003",
      title: "Clinic Foundation",
      description:
        "WARSI homeo CLINIC Homeopathic Clinic was established with a vision to provide natural healing solutions.",
    },
    {
      year: "2008",
      title: "Expansion of Services",
      description:
        "Introduced specialized departments for chronic diseases, pediatric care, and mental health.",
    },
    {
      year: "2013",
      title: "Research Center",
      description:
        "Established our research wing to study and document homeopathic treatment efficacy.",
    },
    {
      year: "2018",
      title: "Digital Transformation",
      description: "Launched telemedicine services to reach patients globally.",
    },
    {
      year: "2023",
      title: "Excellence Center",
      description:
        "Recognized as a center of excellence in homeopathic treatment and research.",
    },
  ];

  const values = [
    {
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      title: "Patient-Centered Care",
      description:
        "We prioritize individual patient needs and provide personalized treatment plans.",
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "Excellence in Treatment",
      description:
        "Committed to delivering the highest quality homeopathic care using proven methods.",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Holistic Approach",
      description:
        "We treat the whole person, not just the symptoms, for complete wellness.",
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "Continuous Innovation",
      description:
        "Staying updated with the latest developments in homeopathic medicine.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="  shadow-xl">
        <Image
          src="/banner4.jpg"
          alt="YouTube Banner"
          width={500} // Specify appropriate width
          height={200} // Match the h-[200px] or h-[500px] based on your design
          className="w-full h-[100px] md:h-[500px] object-cover"
        />
      </div>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-9 py-6">
            About WARSI HOMEO CLINIC
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Two decades of excellence in homeopathic healing, combining
            traditional wisdom with modern medical understanding.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To provide accessible, effective, and personalized homeopathic
                treatments that enhance the natural healing capabilities of the
                human body, improving the quality of life for our patients
                through gentle, holistic care.
              </p>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To be the leading institution in homeopathic medicine,
                recognized globally for our excellence in patient care,
                research, and education, while making natural healing accessible
                to all.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/p3.png"
                alt="Homeopathic medicines"
                width={1260} // Matches w=1260 in the URL
                height={750} // Matches h=750 in the URL
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}

        {/* CTA Section */}
        <div className="bg-green-50 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Start Your Healing Journey Today
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the power of natural healing with our expert homeopathic
            treatments. Book a consultation and take the first step towards
            holistic wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors"
            >
              Book an Appointment
            </Link>
            <Link
              href="/contact"
              className="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-full transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
