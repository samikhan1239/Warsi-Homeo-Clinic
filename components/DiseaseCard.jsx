import Card from "./ui/card";
import Link from "next/link";

export default function DiseaseCard({ disease }) {
  return (
    <Card>
      <h3 className="text-xl font-bold">{disease.name}</h3>
      <p className="mt-2">{disease.description}</p>
      {disease.precautions && (
        <p className="mt-2">
          <strong>Precautions:</strong> {disease.precautions}
        </p>
      )}
      {disease.videoUrl && (
        <div className="mt-4">
          <a
            href={disease.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Watch Video
          </a>
        </div>
      )}
    </Card>
  );
}
