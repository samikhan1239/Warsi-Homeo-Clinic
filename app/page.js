// app/page.jsx
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Award,
  Users,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import ServiceCard from "../components/ui/ServiceCard";
import DoctorCard from "../components/ui/DoctorCard";
import StatCard from "../components/ui/StatCard";
import TestimonialCard from "../components/ui/TestimonialCard";

export default function Home() {
  const featuredServices = [
    {
      id: "chronic",
      title: "Chronic Disease Treatment",
      description:
        "Comprehensive treatment plans for chronic conditions like arthritis, diabetes, and hypertension.",
      icon: "Activity",
      image:
        "https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "allergies",
      title: "Allergies & Respiratory",
      description:
        "Natural remedies for allergies, asthma, and other respiratory conditions without side effects.",
      icon: "Lungs",
      image:
        "https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "mental",
      title: "Mental Health Support",
      description:
        "Homeopathic approaches to anxiety, depression, stress, and sleep disorders.",
      icon: "Brain",
      image:
        "https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const featuredDoctors = [
    {
      id: 1,
      name: "Dr. Tahir Mohammad Warsi",
      specialty: "Senior Homeopathic Physician",
      experience: "15+ years experience",
      image: "/mamu.jpg",
    },
  ];
  const testimonials = [
    {
      id: 1,
      name: "Aarav Mehta",
      testimonial:
        "I had been suffering from sinus problems for years. After starting treatment at WARSI HOMOEO CLINIC, my breathing has improved drastically, and I rarely fall sick now.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
    },
    {
      id: 2,
      name: "Sangeeta Sharma",
      testimonial:
        "My daughter's asthma used to get worse every winter. With regular homeopathic treatment here, she's much healthier and more active throughout the year.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
    },
    {
      id: 3,
      name: "Rahul Verma",
      testimonial:
        "I was dealing with chronic acidity and digestion issues. Thanks to WARSI HOMOEO CLINIC’s natural remedies, I feel light and energetic every day.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/3771830/pexels-photo-3771830.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
    },
    {
      id: 4,
      name: "Kamla Devi",
      testimonial:
        "I had severe joint pain, and walking even short distances was difficult. With regular homeopathy sessions, the pain has reduced a lot. I feel younger and active again!",
      rating: 5,
      image:
        "https://images.pexels.com/photos/6787207/pexels-photo-6787207.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
    },
  ];

  const stats = [
    { id: 1, value: "20+", label: "Years of Excellence", icon: "Award" },
    { id: 2, value: "15,000+", label: "Satisfied Patients", icon: "Users" },
    { id: 3, value: "10+", label: "Specialist Doctors", icon: "UserCheck" },
    { id: 4, value: "95%", label: "Success Rate", icon: "TrendingUp" },
  ];

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Herbal medicine background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/80 to-green-700/70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Natural Healing Through Homeopathic Excellence
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              Discover gentle, effective, and personalized treatments that
              address the root cause of your health concerns, not just the
              symptoms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/appointment"
                className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-colors shadow-md hover:shadow-lg text-center"
              >
                Book a Consultation
              </Link>
              <Link
                href="/services"
                className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium transition-colors text-center inline-flex items-center justify-center"
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 items-center">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                  >
                    <Image
                      src={`https://images.pexels.com/photos/${
                        3756679 + i
                      }/pexels-photo-${3756679 + i}.jpeg?auto=compress&cs=tinysrgb&w=150`}
                      alt={`Patient ${i}`}
                      width={40}
                      height={40}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-200">
                  Trusted by <span className="font-semibold">15,000+</span>{" "}
                  patients
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L80,80C160,64,320,32,480,32C640,32,800,64,960,64C1120,64,1280,32,1360,16L1440,0L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <Image
                src="https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Homeopathic medicines and herbs"
                width={1260}
                height={750}
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to WARSI HOMOEO CLINIC Homeopathic Clinic
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 2003, WARSI HOMOEO CLINIC has been at the forefront
                of homeopathic medicine, offering gentle yet effective
                treatments for a wide range of acute and chronic conditions. Our
                approach focuses on treating the whole person, not just isolated
                symptoms.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Personalized treatment plans tailored to your unique constitution",
                  "Natural remedies with no side effects",
                  "Holistic approach addressing physical, mental and emotional aspects",
                  "Integration with conventional medicine when necessary",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center text-green-700 font-medium hover:text-green-800 transition-colors"
              >
                Learn more about our approach
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Specialized Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of homeopathic treatments
              addressing various health concerns, all tailored to your
              individual constitution and needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Meet Our Specialists
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our team of experienced homeopathic doctors is dedicated to
              providing the highest quality care with compassion and expertise.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src="/mamu.jpg"
              alt="Dr. Tahir Mohammad Warsi"
              width={400} // Adjust based on your design (e.g., typical card width)
              height={360} // Matches h-90 (90 * 4 = 360px)
              className="w-full h-90 object-cover rounded-t-lg"
            />
            <div className="p-6 text-left">
              <p className="text-xl font-semibold text-gray-800">
                Dr. Tahir Mohammad Warsi
              </p>
              <p className="text-green-600 mt-1">
                {" "}
                Senior Homeopathic Specialist
              </p>
              <p> 15+ years expeience</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/doctors"
              className="inline-flex items-center text-green-700 font-medium hover:text-green-800 transition-colors"
            >
              View All Doctors
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Hear from patients who have
              experienced the benefits of our homeopathic treatments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/about#testimonials"
              className="inline-flex items-center text-green-700 font-medium hover:text-green-800 transition-colors"
            >
              Read More Testimonials
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Ready to Start Your Healing Journey?
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Schedule a consultation with one of our expert homeopathic
                    physicians today. We offer both in-person and online
                    appointments for your convenience.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/login"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors text-center"
                    >
                      Book an Appointment
                    </Link>
                    <Link
                      href="/contact"
                      className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-md transition-colors text-center"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 bg-green-100">
                <Image
                  src="https://images.pexels.com/photos/4021769/pexels-photo-4021769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Doctor consulting with patient"
                  width={1260}
                  height={750}
                  style={{ objectFit: "cover" }}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
