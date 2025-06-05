"use client";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  Settings as Lungs,
  Brain,
  Heart,
  Stethoscope,
  Baby,
  Pill,
  Video,
  AlignLeft,
  CheckCircle,
} from "lucide-react";

const ServicesPage = () => {
  const router = useRouter();
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveService(hash);
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    }
  }, []);

  const services = [
    {
      id: "chronic",
      title: "Chronic Disease Treatment",
      description:
        "Comprehensive homeopathic approaches for managing and treating chronic conditions.",
      icon: <Activity className="h-8 w-8 text-green-600" />,
      longDescription:
        "Our specialized chronic disease management protocols address the root causes of persistent health issues, not just their symptoms. We use individualized homeopathic remedies to help your body restore its natural balance and healing mechanisms, offering relief from conditions that have not responded well to conventional treatments.",
      benefits: [
        "Personalized treatment plans based on your unique constitution",
        "Gentle remedies with no side effects or drug interactions",
        "Progressive improvement in overall health and vitality",
        "Reduced reliance on conventional medications (under medical supervision)",
        "Long-term management strategies for better quality of life",
      ],
      image: "/p7.png",
    },
    {
      id: "allergies",
      title: "Allergies & Respiratory Care",
      description:
        "Natural remedies for allergies, asthma, and other respiratory conditions.",
      icon: <Lungs className="h-8 w-8 text-green-600" />,
      longDescription:
        "Our homeopathic approach to respiratory health focuses on strengthening your body's defense mechanisms and reducing hypersensitivity to allergens. We provide effective treatments for seasonal allergies, asthma, chronic sinusitis, and other respiratory conditions using remedies that address both acute symptoms and underlying susceptibilities.",
      benefits: [
        "Relief from acute allergy symptoms without drowsiness or stimulation",
        "Reduced frequency and intensity of asthma attacks",
        "Improved breathing capacity and respiratory function",
        "Decreased sinus congestion and inflammation",
        "Strengthened immune response to common allergens",
      ],
      image: "/p8.png",
    },
    {
      id: "skin",
      title: "Skin Disorder Treatments",
      description:
        "Effective solutions for eczema, psoriasis, acne, and other skin conditions.",
      icon: <AlignLeft className="h-8 w-8 text-green-600" />,
      longDescription:
        "Our dermatological homeopathy program addresses skin conditions by targeting internal imbalances that manifest as external symptoms. Rather than simply suppressing skin eruptions with topical treatments, we work to resolve the underlying causes of your skin issues for lasting improvement and healthier skin.",
      benefits: [
        "Reduced inflammation and irritation in chronic skin conditions",
        "Natural healing without harsh chemicals or steroids",
        "Improvement in skin texture, appearance and comfort",
        "Addressing emotional aspects that may trigger or worsen skin conditions",
        "Personalized skin care recommendations to complement treatments",
      ],
      image: "/p9.jpg",
    },
    {
      id: "digestive",
      title: "Digestive Health Solutions",
      description:
        "Relief from IBS, acid reflux, chronic constipation, and other digestive issues.",
      icon: <Stethoscope className="h-8 w-8 text-green-600" />,
      longDescription:
        "Our digestive health program utilizes homeopathic remedies to restore balance to your entire digestive system. We address both acute symptoms and chronic conditions by identifying specific patterns of digestive dysfunction and providing targeted remedies that work with your body's natural healing processes.",
      benefits: [
        "Relief from chronic digestive discomfort and pain",
        "Improved nutrient absorption and digestive efficiency",
        "Reduced bloating, gas, and irregular bowel movements",
        "Management of food sensitivities and intolerances",
        "Support for gut microbiome health and balance",
      ],
      image: "/p10.webp",
    },
    {
      id: "mental",
      title: "Mental Health Support",
      description:
        "Homeopathic approaches to anxiety, depression, stress, and sleep disorders.",
      icon: <Brain className="h-8 w-8 text-green-600" />,
      longDescription:
        "Our mental health program recognizes the profound connection between mind and body. We offer gentle yet effective homeopathic remedies that address emotional and psychological imbalances, helping to restore mental clarity, emotional stability, and overall well-being without the side effects often associated with conventional psychiatric medications.",
      benefits: [
        "Natural relief from anxiety, depression, and mood fluctuations",
        "Improved sleep quality and regulation",
        "Enhanced stress resilience and coping mechanisms",
        "Support during major life transitions and grief",
        "Complementary approach that works alongside conventional therapy",
      ],
      image: "/p5.png",
    },
    {
      id: "pediatric",
      title: "Pediatric Homeopathy",
      description:
        "Safe and gentle treatments for infants, children, and adolescents.",
      icon: <Baby className="h-8 w-8 text-green-600" />,
      longDescription:
        "Our pediatric homeopathy services provide gentle, non-toxic remedies specifically chosen to support children's developing systems. From common childhood illnesses to developmental and behavioral concerns, we offer safe alternatives or complements to conventional treatments, carefully individualized for each child's unique needs.",
      benefits: [
        "Gentle treatment options without side effects or harmful additives",
        "Support for healthy immune system development",
        "Management of common childhood ailments without overusing antibiotics",
        "Help with developmental, behavioral, and emotional challenges",
        "Building a foundation for lifelong health and resilience",
      ],
      image: "/p11.jpg",
    },
    {
      id: "consultation",
      title: "Online Consultation",
      description:
        "Convenient virtual appointments with our homeopathic specialists from anywhere.",
      icon: <Video className="h-8 w-8 text-green-600" />,
      longDescription:
        "Our secure, user-friendly online consultation service allows you to access expert homeopathic care regardless of your location. Through comprehensive virtual appointments, our practitioners can assess your condition, recommend appropriate remedies, and provide ongoing support for your homeopathic treatment journey.",
      benefits: [
        "Convenient access to quality homeopathic care from your home",
        "Secure, private, and HIPAA-compliant video consultation platform",
        "Same personalized approach as in-person appointments",
        "Electronic prescriptions and remedy recommendations",
        "Flexible scheduling options to accommodate your busy lifestyle",
      ],
      image:
        "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of homeopathic treatments addressing
            various health concerns, all tailored to your individual
            constitution and needs.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${
                activeService === service.id
                  ? "ring-2 ring-green-600 shadow-lg"
                  : "hover:shadow-lg"
              }`}
              onClick={() => {
                setActiveService(service.id);
                document
                  .getElementById(service.id)
                  ?.scrollIntoView({ behavior: "smooth" });
                router.push(`#${service.id}`);
              }}
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400} // Adjust based on your design (e.g., typical card width)
                  height={192} // Matches h-48 (48 * 4 = 192px)
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-green-50 p-3 rounded-full mr-4 flex-shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Service Information */}
        <div className="space-y-16">
          {services.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className={`scroll-mt-24 transition-all duration-500 ${
                activeService === service.id ? "opacity-100" : "opacity-70"
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={600} // Adjust based on your design (e.g., typical section width)
                      height={400} // Adjust based on your design (e.g., typical image height)
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-50 p-3 rounded-full mr-4">
                        {service.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {service.longDescription}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Benefits:
                    </h3>
                    <ul className="space-y-3 mb-6">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/login"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
                    >
                      Book a Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
