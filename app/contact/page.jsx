"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here (e.g., API call)
    console.log("Form submitted:", formData);
    // Reset form or show success message
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Have questions about our homeopathic treatments? Get in touch with
            our team of experts. We&apos;re here to help you on your journey to
            natural healing.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-50 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Visit Us
                    </h3>
                    <p className="text-gray-600">
                      123 Healing Street
                      <br />
                      Wellness Valley, CA 92345
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-50 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Call Us
                    </h3>
                    <p className="text-gray-600">
                      +1 (555) 123-4567
                      <br />
                      +1 (555) 987-6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-50 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Email Us
                    </h3>
                    <p className="text-gray-600">
                      info@WARSI HOMOEO CLINIC.com
                      <br />
                      appointments@WARSI HOMOEO CLINIC.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-50 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Working Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9am - 7pm
                      <br />
                      Saturday: 9am - 5pm
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0673274807!2d-122.41941708439499!3d37.77492977975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjciTiAxMjLCsDI1JzA2LjYiVw!5e0!3m2!1sen!2sus!4v1635786983800!5m2!1sen!2sus"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Clinic Location"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Send Us a Message
              </h2>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>
                  By submitting this form, you agree to our{" "}
                  <Link
                    href="/privacy"
                    className="text-green-600 hover:text-green-700"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/terms"
                    className="text-green-600 hover:text-green-700"
                  >
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
