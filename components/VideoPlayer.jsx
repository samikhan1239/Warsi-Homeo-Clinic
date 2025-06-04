export default function VideoPlayer({ video }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-bold">{video.title}</h3>
      <video controls className="w-full mt-4">
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
