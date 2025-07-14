// src/pages/Home/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import HeroBanner from "./HeroBanner";
import MovieRow from "../../components/MovieRow";
import Footer from "../../components/Footer";

const TMDB_API_KEY = "362dc1a026944ec0f801be34ae6fff8d";
const BASE_URL = "https://api.themoviedb.org/3";
const NETFLIX_PROVIDER_ID = 8;

const countryToRegion = {
  India: "IN",
  "United States": "US",
  USA: "US",
  UK: "GB",
  Canada: "CA",
  Australia: "AU",
  Germany: "DE",
  France: "FR",
  Spain: "ES",
  Japan: "JP",
};

const HomePage = () => {
  const location = useLocation();
  const [region, setRegion] = useState("IN");
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Check if user was passed via location.state (after signup)
  useEffect(() => {
    const passedUser = location.state?.user;
    const stored = JSON.parse(localStorage.getItem("user"));

    if (passedUser) {
      setCurrentUser(passedUser);
      localStorage.setItem("user", JSON.stringify(passedUser));
    } else if (stored?.user) {
      setCurrentUser(stored.user);
    } else if (stored) {
      setCurrentUser(stored);
    } else {
      setCurrentUser(null);
    }
  }, [location.state]);

  // ✅ Set region based on user country or fallback via IP
  useEffect(() => {
    if (currentUser?.country && countryToRegion[currentUser.country]) {
      setRegion(countryToRegion[currentUser.country]);
    } else {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          if (data.country_code) setRegion(data.country_code);
        })
        .catch((err) => console.error("IP geolocation error:", err));
    }
  }, [currentUser]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar loggedIn={!!currentUser} user={currentUser} />
      <HeroBanner />

      <MovieRow
        title={`Now Streaming on Netflix (${region})`}
        fetchURL={`${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_watch_providers=${NETFLIX_PROVIDER_ID}&watch_region=${region}&language=en-US&sort_by=popularity.desc`}
      />
      <MovieRow
        title="Trending Now (Movies & TV)"
        fetchURL={`${BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`}
      />
      <MovieRow
        title="Top Rated Movies"
        fetchURL={`${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`}
      />
      <MovieRow
        title="Top Rated TV Shows"
        fetchURL={`${BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`}
      />
      <MovieRow
        title="Popular Movies"
        fetchURL={`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`}
      />
      <MovieRow
        title="Popular TV Shows"
        fetchURL={`${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`}
      />
      <MovieRow
        title="Upcoming Movies"
        fetchURL={`${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`}
      />
      <MovieRow
        title="Airing Today (TV)"
        fetchURL={`${BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}&language=en-US&page=1`}
      />

      <Footer />
    </div>
  );
};

export default HomePage;
