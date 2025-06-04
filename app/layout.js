import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Homeopathy Clinic",
  description: "Book appointments and access homeopathic resources",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
