// src/components/SigninModal.jsx
import React, { useState } from "react";

const SigninModal = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User logged in:", data);
        localStorage.setItem("user", JSON.stringify(data)); // ✅ persist
        onSuccess(data); // callback to parent
        onClose(); // close modal
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="bg-gray-900 p-8 rounded-md w-full max-w-md text-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

        <form onSubmit={handleSignin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-800 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-800 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full p-3 bg-red-600 rounded hover:bg-red-700 transition font-bold"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SigninModal;
