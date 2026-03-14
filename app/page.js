import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Award,
  Users,
  UserCheck,
  TrendingUp,
  Headphones,
  Leaf,
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
      image: "/p4.png",
    },
    {
      id: "allergies",
      title: "Allergies & Respiratory",
      description:
        "Natural remedies for allergies, asthma, and other respiratory conditions without side effects.",
      icon: "Lungs",
      image: "/p1.jpg",
    },
    {
      id: "mental",
      title: "Mental Health Support",
      description:
        "Homeopathic approaches to anxiety, depression, stress, and sleep disorders.",
      icon: "Brain",
      image: "/p2.jpg",
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
        "I had been suffering from sinus problems for years. After starting treatment at WARSI homeo CLINIC, my breathing has improved drastically, and I rarely fall sick now.",
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
        "I was dealing with chronic acidity and digestion issues. Thanks to WARSI homeo CLINIC’s natural remedies, I feel light and energetic every day.",
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
    { id: 3, value: "24/7", label: "Patient Support", icon: "Headphones" },
    { id: 4, value: "95%", label: "Success Rate", icon: "TrendingUp" },
  ];

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
    
  <section className="relative py-20 md:py-28 lg:py-32 bg-gradient-to-b from-sage-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full">
              <Leaf className="w-4 h-4 text-emerald-700" />
              <span className="text-sm font-medium text-emerald-700">Rooted in Nature & Science</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                Healing through
                <span className="block text-emerald-700">natural wellness</span>
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-xl">
                Evidence-based herbal medicine combined with traditional wisdom. Experience personalized care designed for your unique health journey.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 transition-all duration-300 hover:shadow-lg"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-neutral-200 text-neutral-900 font-semibold rounded-lg hover:border-emerald-700 hover:bg-emerald-50 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
              <div>
                <div className="text-2xl font-bold text-emerald-700">500+</div>
                <p className="text-sm text-neutral-600">Happy Clients</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-700">15+</div>
                <p className="text-sm text-neutral-600">Years Experience</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-700">100%</div>
                <p className="text-sm text-neutral-600">Natural Remedies</p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative hidden lg:block animate-fade-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Image frame with accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl" />
              <Image
                src="/banner3.png"
                alt="Natural herbal medicine preparation with fresh herbs and mortar"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
                priority
                quality={85}
              />
            </div>

            {/* Floating card for visual interest */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">Certified Organic</p>
                  <p className="text-sm text-neutral-600">Sustainably sourced</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits grid - below on mobile, integrated above on desktop */}
        <div className="lg:hidden mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-shadow">
            <Leaf className="w-8 h-8 text-emerald-700 mb-3" />
            <h3 className="font-semibold text-neutral-900 mb-2">100% Natural</h3>
            <p className="text-sm text-neutral-600">No synthetic additives or harmful chemicals</p>
          </div>
          <div className="p-6 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-shadow">
            <Leaf className="w-8 h-8 text-emerald-700 mb-3" />
            <h3 className="font-semibold text-neutral-900 mb-2">Science-Backed</h3>
            <p className="text-sm text-neutral-600">Evidence-based formulations and methods</p>
          </div>
          <div className="p-6 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-shadow">
            <Leaf className="w-8 h-8 text-emerald-700 mb-3" />
            <h3 className="font-semibold text-neutral-900 mb-2">Personalized Care</h3>
            <p className="text-sm text-neutral-600">Tailored treatments for your unique needs</p>
          </div>
          <div className="p-6 bg-white border border-neutral-200 rounded-xl hover:shadow-md transition-shadow">
            <Leaf className="w-8 h-8 text-emerald-700 mb-3" />
            <h3 className="font-semibold text-neutral-900 mb-2">Holistic Approach</h3>
            <p className="text-sm text-neutral-600">Mind, body, and spirit wellness</p>
          </div>
        </div>
      </div>

      {/* Mobile image - show below content on mobile */}
      <div className="lg:hidden mt-12 px-6 sm:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/banner3.png"
            alt="Natural herbal medicine preparation with fresh herbs and mortar"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            quality={85}
          />
        </div>
      </div>
    </section>
      {/* About Section */}
      <section className=" bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to WARSI HOMEO CLINIC
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 2005, WARSI homeo CLINIC has been at the forefront of
                homeopathic medicine, offering gentle yet effective treatments
                for a wide range of acute and chronic conditions. Our approach
                focuses on treating the whole person, not just isolated
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
            <div className="md:w-1/2">
              <Image
                src="/banner2.png"
                alt="Homeopathic medicines and herbs"
                width={1260}
                height={750}
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
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
      <section className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20 bg-gray-50">
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
              width={400}
              height={360}
              className="w-full h-90 object-cover rounded-t-lg"
            />
            <div className="p-6 text-left">
              <p className="text-xl font-semibold text-gray-800">
                Dr. Tahir Mohammad Warsi
              </p>
              <p className="text-green-600 mt-1">
                Senior Homeopathic Specialist
              </p>
              <p>15+ years experience</p>
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Dont just take our word for it. Hear from patients who have
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
      <section className="py-20 bg-green-50">
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
