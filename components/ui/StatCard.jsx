import {
  Award,
  Users,
  UserCheck,
  TrendingUp,
  Smile,
  Calendar,
  Heart,
  ShieldCheck,
} from "lucide-react";

const StatCard = ({ stat }) => {
  const { value, label, icon } = stat;

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Award":
        return <Award className="h-10 w-10" />;
      case "Users":
        return <Users className="h-10 w-10" />;
      case "UserCheck":
        return <UserCheck className="h-10 w-10" />;
      case "TrendingUp":
        return <TrendingUp className="h-10 w-10" />;
      case "Smile":
        return <Smile className="h-10 w-10" />;
      case "Calendar":
        return <Calendar className="h-10 w-10" />;
      case "Heart":
        return <Heart className="h-10 w-10" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-10 w-10" />;
      default:
        return <Award className="h-10 w-10" />;
    }
  };

  return (
    <div className="text-center">
      <div className="bg-green-600/30 p-4 rounded-full inline-flex items-center justify-center mb-4">
        {getIcon(icon)}
      </div>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-green-100">{label}</p>
    </div>
  );
};

export default StatCard;
