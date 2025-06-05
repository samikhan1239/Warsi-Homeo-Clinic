import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";

const DoctorsPage = () => {
  const doctor = {
    id: 1,
    name: "Dr. Tahir Mohammad Warsi",
    specialty: "Senior Homeopathic Physician",
    experience: "15+ years experience",
    image: "/mamu.jpg", // Use your actual local path or external url
    education:
      "BHMS, Homeopathy, Professor - Narayan Shree Homoeopathic Medical College",
    specializations: [
      "Chronic Diseases",
      "Autoimmune Disorders",
      "Mental Health",
    ],
    languages: ["English", "Hindi"],
    availability: "Mon-Sat: 6:00 PM - 10:00 PM",
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Our Expert Doctor
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our experienced homeopathic physician dedicated to providing
            personalized care and natural healing solutions for your health.
          </p>
        </div>

        {/* Doctor Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/3 h-90 md:h-auto">
            <Image
              src={doctor.image}
              alt={doctor.name}
              width={400} // Adjust based on your design (e.g., typical card width)
              height={600} // Adjust based on your design (e.g., matches md:h-auto)
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="md:w-2/3 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {doctor.name}
              </h2>
              <p className="text-green-600 font-semibold mb-1">
                {doctor.specialty}
              </p>
              <p className="text-gray-600 mb-4">{doctor.experience}</p>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-1">Education</h3>
                <p className="text-gray-600">{doctor.education}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.specializations.map((spec, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-1">Languages</h3>
                <p className="text-gray-600">{doctor.languages.join(", ")}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Availability</h3>
              <div className="flex items-center text-gray-600 mb-6">
                <Clock className="h-5 w-5 mr-2" />
                <span>{doctor.availability}</span>
              </div>

              <Link
                href={"/login"}
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Clinic Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Clinic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-700">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
                <p>
                  Shop No 2 Lala Lajpat Rai Colony Near Super Shadi Hall Bagh
                  Dilkusha, Raisen Road , Bhopal (MP)
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                <p>+91 7697160607</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="h-6 w-6 text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                <p>appointments@warsi-homeo-clinic.in</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-6 w-6 text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Hours</h3>
                <p>Mon-Fri: 6pm - 10pm</p>
                <p>Sat: 5pm - 10pm</p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
