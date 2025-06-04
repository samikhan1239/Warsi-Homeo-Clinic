import Image from "next/image";
import { Star, Quote } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  const { name, testimonial: text, rating, image } = testimonial;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
      <div className="absolute top-6 right-6 text-green-100">
        <Quote className="h-12 w-12 transform rotate-180" />
      </div>

      <div className="flex items-center mb-6">
        <Image
          src={image}
          alt={name}
          width={56}
          height={56}
          style={{ objectFit: "cover" }}
          className="w-14 h-14 rounded-full mr-4"
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-gray-600 relative z-10">{text}</p>
    </div>
  );
};

export default TestimonialCard;
