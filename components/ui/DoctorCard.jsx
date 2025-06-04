import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

const DoctorCard = ({ doctor }) => {
  const { id, name, specialty, experience, image } = doctor;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={400}
          height={256}
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Link
          href={`/appointment?doctor=${id}`}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-green-700 px-4 py-2 rounded-full flex items-center font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-md"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Book Appointment
        </Link>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-green-700 font-medium mb-1">{specialty}</p>
        <p className="text-gray-600 text-sm">{experience}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
