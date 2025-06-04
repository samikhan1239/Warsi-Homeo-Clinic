import Card from "./ui/card";
import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <Card>
      <h3 className="text-xl font-bold">{course.title}</h3>
      <p className="mt-2">{course.description}</p>
      <Link
        href={`/dashboard/student/videos?courseId=${course.id}`}
        className="mt-4 inline-block text-primary hover:underline"
      >
        View Videos
      </Link>
    </Card>
  );
}
