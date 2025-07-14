// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 text-sm px-8 py-12 mt-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <p className="text-gray-400">Questions? Call 000-800-040-1843</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
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
            "Corporate Information",
            "Contact Us",
          ].map((link, idx) => (
            <a key={idx} href="#" className="hover:underline">
              {link}
            </a>
          ))}
        </div>

        <div>
          <select
            className="bg-transparent border border-gray-500 text-white px-3 py-1 rounded mt-4"
          >
            <option value="en">🌐 English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>

        <p className="text-gray-500 mt-4">CleanFlix India</p>
      </div>
    </footer>
  );
};

export default Footer;
