import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  AlignLeft,
  Baby,
  Brain,
  Heart,
  Stethoscope,
  Pill,
} from "lucide-react";

const ServiceCard = ({ service }) => {
  const { id, title, description, icon, image } = service;

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Activity":
        return <Activity className="h-6 w-6 text-green-600" />;
      case "Lungs": // Map 'Lungs' to 'Heart' as a fallback
        return <Heart className="h-6 w-6 text-green-600" />;
      case "Brain":
        return <Brain className="h-6 w-6 text-green-600" />;
      case "Heart":
        return <Heart className="h-6 w-6 text-green-600" />;
      case "Stethoscope":
        return <Stethoscope className="h-6 w-6 text-green-600" />;
      case "Baby":
        return <Baby className="h-6 w-6 text-green-600" />;
      case "Pill":
        return <Pill className="h-6 w-6 text-green-600" />;
      default:
        return <AlignLeft className="h-6 w-6 text-green-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={192}
          style={{ objectFit: "cover" }}
          className="w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start mb-4">
          <div className="bg-green-50 p-3 rounded-full mr-4">
            {getIcon(icon)}
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <Link
          href={`/services#${id}`}
          className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors mt-auto"
        >
          Learn more
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
