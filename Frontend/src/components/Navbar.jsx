// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiUser, FiSearch } from "react-icons/fi";
import SigninModal from "./SigninModal";
import SignoutModal from "./SignoutModal";
import MovieDetailsModal from "./MovieDetailsModal";
import VideoPlayerModal from "./VideoPlayerModal";
import axios from "axios";

const TMDB_API_KEY = "362dc1a026944ec0f801be34ae6fff8d";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSearchId, setSelectedSearchId] = useState(null);
  const [selectedSearchType, setSelectedSearchType] = useState(null);
  const [showPlayerUrl, setShowPlayerUrl] = useState(null);

  // ✅ Rehydrate currentUser across reloads, redirects, and navigation
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored?.user) setCurrentUser(stored.user);
    else if (stored) setCurrentUser(stored);
    else setCurrentUser(null);
  }, [location.pathname]);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData.user || userData);
    setShowModal(false);
    navigate("/home");
  };

  const confirmSignOut = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setShowSignoutModal(false);
    navigate("/");
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter" || e === "click") {
      if (!searchTerm.trim()) return;
      setSearching(true);
      setNoResult(false);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(searchTerm)}`
        );
        const results = res.data.results.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        );
        setSearchResults(results);
        if (results.length === 0) setNoResult(true);
      } catch (err) {
        console.error("Search failed:", err);
        setNoResult(true);
      } finally {
        setSearching(false);
      }
    }
  };

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-[99] flex items-center justify-between px-8 py-4 bg-transparent">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-extrabold text-red-600 tracking-widest drop-shadow-md cursor-pointer"
        >
          CleanFlix
        </h1>

        {currentUser && (
          <div className="flex items-center bg-gray-800 text-white rounded px-3 py-1 space-x-2 w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search movies or TV shows..."
              className="bg-transparent focus:outline-none w-full placeholder-gray-400"
            />
            <FiSearch
              onClick={() => handleSearch("click")}
              className="cursor-pointer hover:text-red-500"
            />
          </div>
        )}

        {currentUser ? (
          <div className="flex items-center space-x-6 text-white">
            <button title="Notifications">🔔</button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden hover:bg-gray-600 transition"
              >
                <FiUser size={22} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded shadow-lg text-sm overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="font-medium">
                      Hello, {currentUser?.firstName || "User"}
                    </p>
                  </div>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-800 transition">
                    Account Settings
                  </button>
                  <button
                    onClick={() => setShowSignoutModal(true)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-800 transition"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-sm hover:bg-red-700 transition drop-shadow-md"
          >
            Sign In
          </button>
        )}
      </nav>

      {/* 🔍 Search Results */}
      {searchTerm && (
        <div className="absolute top-[70px] left-0 right-0 z-[98] bg-black/90 px-8 py-6">
          {searching ? (
            <p className="text-white">Searching...</p>
          ) : noResult ? (
            <p className="text-gray-400">No Results Found for "{searchTerm}"</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  className="text-white text-center cursor-pointer"
                  onClick={() => {
                    setSelectedSearchId(item.id);
                    setSelectedSearchType(item.media_type);
                  }}
                >
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={item.title || item.name}
                    className="rounded hover:scale-105 transition duration-300"
                  />
                  <p className="mt-2 text-sm">{item.title || item.name}</p>
                  <p className="text-xs text-gray-400 capitalize">
                    {item.media_type === "tv" ? "TV Show" : "Movie"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 🔐 Auth Modals */}
      {showModal && (
        <SigninModal
          onClose={() => setShowModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
      {showSignoutModal && (
        <SignoutModal
          onCancel={() => setShowSignoutModal(false)}
          onConfirm={confirmSignOut}
        />
      )}

      {/* 🎬 Search Result Playback */}
      {selectedSearchId && (
        <MovieDetailsModal
          movieId={selectedSearchId}
          mediaType={selectedSearchType}
          onClose={() => {
            setSelectedSearchId(null);
            setSelectedSearchType(null);
          }}
          onPlayMovie={(url) => setShowPlayerUrl(url)}
          onPlayEpisode={(url) => setShowPlayerUrl(url)}
        />
      )}

      {/* 📺 Video Player */}
      {showPlayerUrl && (
        <VideoPlayerModal
          embedUrl={showPlayerUrl}
          onClose={() => setShowPlayerUrl(null)}
        />
      )}
    </>
  );
};

export default Navbar;
