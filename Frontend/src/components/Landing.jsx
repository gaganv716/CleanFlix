// src/pages/Landing.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import landingBg from "../assets/Landing.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // ✅ Redirect signed-in users to /home
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      navigate("/home");
    }
  }, []);

  const handleGetStarted = () => {
    if (email.trim() === "") {
      setError("Email is required");
    } else {
      setError("");
      navigate("/register", { state: { email } });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${landingBg})`,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "overlay",
        }}
      ></div>

      {/* Navbar */}
      <Navbar loggedIn={false} />

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-32 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Unlimited movies, TV shows, and more.
        </h1>
        <p className="text-xl mb-6 drop-shadow-sm">Ad-free. Just pure cinema.</p>
        <p className="text-lg mb-6 drop-shadow-sm">
          Ready to watch? Enter your email to create your account.
        </p>

        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 w-full max-w-xl">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`p-4 flex-1 rounded-sm mb-4 sm:mb-0 text-black bg-white ${
              error ? "border-2 border-red-500" : ""
            }`}
          />
          <button
            onClick={handleGetStarted}
            className="bg-red-600 text-white text-lg font-bold px-6 py-4 rounded-sm hover:bg-red-700 transition"
          >
            GET STARTED &gt;
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
