// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  const handlePopup = (title) => {
    alert(`${title} feature is currently unavailable.\nComing soon on CleanFlix!`);
  };

  const footerLinks = [
    "FAQ",
    "Help Center",
    "Account",
    "Media Center",
    "Investor Relations",
    "Jobs",
    "Ways to Watch",
    "Terms of Use",
    "Privacy",
    "Cookie Preferences",
    "Corporate Info",
    "Contact Us",
  ];

  return (
    <footer className="bg-black text-gray-400 text-sm px-8 py-12 mt-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Logo */}
        <div className="text-3xl font-bold text-red-600">
          CleanFlix
        </div>

        {/* Support Info */}
        <p className="text-gray-400">
          Have Questions? Call us at <span className="underline">000-800-040-1843</span>
        </p>

        {/* Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {footerLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => handlePopup(link)}
              className="text-left hover:text-white transition duration-200"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Language Selector */}
        <div className="mt-4">
          <select
            className="bg-transparent border border-gray-500 text-white px-3 py-1 rounded"
          >
            <option value="en">🌐 English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>

        {/* Bottom Info */}
        <p className="text-gray-500 mt-6">© {new Date().getFullYear()} CleanFlix India. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
