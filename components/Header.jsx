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
    // Scroll detection
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 10);
      setIsVisible(currentY < lastScrollY || currentY < 50); // Show if scrolling up or near top
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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Doctors", path: "/doctors" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/Blog" },
  ];

  return (
    <header
      className={`fixed bg-transparent top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/80 backdrop-blur-md py-4"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"} transform`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center transition-all duration-300">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-green-700 tracking-tight"
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`transition-colors duration-300 hover:text-green-600 ${
                pathname === link.path
                  ? "text-green-600"
                  : isScrolled
                    ? "text-gray-700"
                    : "text-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>{user.username || "User"}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-green-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-gray-700 hover:text-green-600"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Appointment CTA */}
        <Link
          href="/login"
          className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition transform hover:-translate-y-1"
        >
          Book Appointment
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 transition-transform duration-300 transform hover:scale-110"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-50">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`py-2 px-4 rounded transition-colors duration-300 ${
                  pathname === link.path
                    ? "text-green-600 font-medium bg-green-50"
                    : "text-gray-700 hover:text-green-600"
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 py-2 px-4 rounded transition-colors duration-300 text-gray-700 hover:text-green-600"
                  onClick={closeMenu}
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 text-left text-gray-700 hover:text-green-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="py-2 px-4 text-gray-700 hover:text-green-600"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="py-2 px-4 text-gray-700 hover:text-green-600"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
            <Link
              href="/login"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md text-center font-medium"
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
