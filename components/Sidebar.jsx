"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  BookOpen,
  User,
  Menu,
  X,
  Calendar,
  Stethoscope,
  Video,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const adminLinks = [
    {
      href: "/dashboard/admin",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: "/dashboard/admin/appointments",
      label: "Appointments",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      href: "/dashboard/admin/diseases",
      label: "Diseases",
      icon: <Stethoscope className="h-5 w-5" />,
    },
    {
      href: "/dashboard/admin/courses",
      label: "Courses",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      href: "/dashboard/admin/videos",
      label: "Videos",
      icon: <Video className="h-5 w-5" />,
    },
    {
      href: "/dashboard/admin/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  const patientLinks = [
    {
      href: "/dashboard/patient",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: "/dashboard/patient/appointments",
      label: "Appointments",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      href: "/dashboard/patient/diseases",
      label: "Diseases",
      icon: <Stethoscope className="h-5 w-5" />,
    },
    {
      href: "/dashboard/patient/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  const studentLinks = [
    {
      href: "/dashboard/student",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: "/dashboard/student/courses",
      label: "Courses",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      href: "/dashboard/student/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  const links = (() => {
    switch (role.toLowerCase()) {
      case "admin":
        return adminLinks;
      case "patient":
        return patientLinks;
      case "student":
        return studentLinks;
      default:
        console.warn("Invalid role provided:", role);
        return [];
    }
  })();

  return (
    <TooltipProvider>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-20 left-4 z-20">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-green-600 border-green-500 hover:bg-green-50"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`bg-white shadow-md w-64 min-h-screen fixed top-16 left-0 z-10 border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:static md:flex-shrink-0`}
      >
        <div className="p-6 pt-12 md:pt-6">
          <div className="mb-8 flex items-center gap-2">
            <h2 className="text-xl font-bold text-green-700">
              {role.toLowerCase() === "admin"
                ? "Admin"
                : role.toLowerCase() === "student"
                  ? "Student"
                  : "Patient"}{" "}
              Panel
            </h2>
          </div>
          <nav className="flex flex-col gap-2">
            {links.length === 0 ? (
              <p className="text-gray-500 text-sm">No navigation available</p>
            ) : (
              links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                return (
                  <Tooltip key={link.href}>
                    <TooltipTrigger asChild>
                      <Link href={link.href} passHref>
                        <Button
                          variant="ghost"
                          onClick={() => setIsOpen(false)}
                          className={`w-full flex items-center justify-start gap-3 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                            isActive
                              ? "bg-green-100 text-green-700"
                              : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                          } hover:scale-[1.02]`}
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-green-600 text-white"
                    >
                      {link.label}
                    </TooltipContent>
                  </Tooltip>
                );
              })
            )}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </TooltipProvider>
  );
}
