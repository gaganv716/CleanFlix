import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const genresList = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Animation', 'Documentary',
];

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prefilledEmail = location.state?.email || '';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: prefilledEmail,
    password: '',
    age: '',
    country: '',
    preferences: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenreToggle = (genre) => {
    const updatedPreferences = formData.preferences.includes(genre)
      ? formData.preferences.filter((g) => g !== genre)
      : [...formData.preferences, genre];

    setFormData({ ...formData, preferences: updatedPreferences });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Register Data:', formData);

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User Registered:', data);
        navigate('/home', { state: { user: formData } }); // ✅ Pass user to HomePage
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* ✅ Navbar */}
      <Navbar loggedIn={false} />

      {/* ✅ Content below navbar */}
      <div className="flex flex-col items-center justify-center pt-24 p-8">
        <h2 className="text-4xl font-bold mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
          {/* Personal Info */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          {/* Preferences */}
          <h3 className="text-2xl font-semibold mt-8 mb-4">What do you like to watch?</h3>
          <div className="flex flex-wrap gap-3">
            {genresList.map((genre) => (
              <button
                type="button"
                key={genre}
                onClick={() => handleGenreToggle(genre)}
                className={`px-4 py-2 rounded border ${
                  formData.preferences.includes(genre)
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'bg-gray-700 border-gray-500 text-gray-300'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-8 p-4 bg-red-600 text-white text-lg font-bold rounded hover:bg-red-700 transition"
          >
            Continue to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
