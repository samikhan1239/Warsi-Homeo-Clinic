"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { verifyToken } from "../lib/jwt";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 10);
      setIsVisible(currentY < lastScrollY || currentY < 50);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded = verifyToken(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0";
    setUser(null);
    router.push("/login");
    closeMenu();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/80 backdrop-blur-md py-4"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"} transform`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-green-700"
          onClick={closeMenu}
        >
          <Image
            src="/logo.jpg"
            alt="WARSI homeo CLINIC Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="whitespace-nowrap">WARSI HOMEO CLINIC</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">

          <Link href="/" className="hover:text-green-600">
            Home
          </Link>

          <Link href="/about" className="hover:text-green-600">
            About
          </Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <button className="hover:text-green-600">
              Services
            </button>

            <div className="absolute left-0 top-full mt-1 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white shadow-lg rounded-lg w-56 border">

              <Link
                href="/report-analyzer"
                className="block px-4 py-3 hover:bg-green-50"
              >
                Medical Report Analyzer
              </Link>

              <Link
                href="/xray"
                className="block px-4 py-3 hover:bg-green-50"
              >
                X-ray Analysis
              </Link>

              <Link
                href="/medical-chat"
                className="block px-4 py-3 hover:bg-green-50"
              >
                Doctor AI Assistant
              </Link>

            </div>
          </div>

          {/* Doctors Dropdown */}
          <div className="relative group">
            <button className="hover:text-green-600">
              Doctors
            </button>

            <div className="absolute left-0 top-full mt-1 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white shadow-lg rounded-lg w-56 border">

              <Link
                href="/medical-chat"
                className="block px-4 py-3 hover:bg-green-50"
              >
                AI Medical Assistant
              </Link>

              <Link
                href="/doctors"
                className="block px-4 py-3 hover:bg-green-50"
              >
                Our Medical Team
              </Link>

            </div>
          </div>

          <Link href="/blog" className="hover:text-green-600">
            Blog
          </Link>

          <Link href="/contact" className="hover:text-green-600">
            Contact
          </Link>

          {user ? (
            <div className="flex items-center gap-4">

              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-700 hover:text-green-600"
              >
                <User className="h-5 w-5" />
                <span>{user.username || "User"}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-green-600"
              >
                Logout
              </button>

            </div>
          ) : (
            <>
              <Link href="/login" className="hover:text-green-600">
                Login
              </Link>

              <Link href="/register" className="hover:text-green-600">
                Register
              </Link>
            </>
          )}

        </nav>

        {/* CTA */}
        <Link
          href="/login"
          className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition transform hover:-translate-y-1"
        >
          Book Appointment
        </Link>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">

          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">

            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/about" onClick={closeMenu}>About</Link>

            <Link href="/report-analyzer" onClick={closeMenu}>
              Medical Report Analyzer
            </Link>

            <Link href="/xray" onClick={closeMenu}>
              X-ray Analysis
            </Link>

            <Link href="/medical-chat" onClick={closeMenu}>
              AI Medical Assistant
            </Link>

            <Link href="/doctors" onClick={closeMenu}>
              Our Medical Team
            </Link>

            <Link href="/blog" onClick={closeMenu}>
              Blog
            </Link>

            <Link href="/contact" onClick={closeMenu}>
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                  Dashboard
                </Link>

                <button onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={closeMenu}>
                  Login
                </Link>

                <Link href="/register" onClick={closeMenu}>
                  Register
                </Link>
              </>
            )}

            <Link
              href="/login"
              className="bg-green-600 text-white py-3 px-4 rounded-md text-center"
              onClick={closeMenu}
            >
              Book Appointment
            </Link>

          </div>

        </div>
      )}
    </header>
  );
};

export default Header;