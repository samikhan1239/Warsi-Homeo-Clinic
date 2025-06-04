import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Homeopathy Clinic. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/diseases">Diseases</Link>
        </div>
      </div>
    </footer>
  );
}
