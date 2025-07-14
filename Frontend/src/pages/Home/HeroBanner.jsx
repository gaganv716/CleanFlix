// src/components/HeroBanner.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactPlayer from "react-player/youtube";
import MovieDetailsModal from "../../components/MovieDetailsModal";
import VideoPlayerModal from "../../components/VideoPlayerModal";

const TMDB_API_KEY = "362dc1a026944ec0f801be34ae6fff8d";
const BASE_URL = "https://api.themoviedb.org/3";

const HeroBanner = () => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [muted, setMuted] = useState(true);
  const [showTrailer, setShowTrailer] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    async function fetchMovieAndTrailer() {
      try {
        const res = await axios.get(
          `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        const movies = res.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);

        const videoRes = await axios.get(
          `${BASE_URL}/movie/${randomMovie.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
        );
        const videos = videoRes.data.results.filter(
          (v) => v.site === "YouTube" && v.type.toLowerCase().includes("trailer")
        );

        const title = randomMovie.title?.toLowerCase() || randomMovie.original_title?.toLowerCase() || "";

        // ✅ Try exact match first
        const exactMatch = videos.find((vid) => {
          const name = vid.name.toLowerCase();
          return name.includes(title);
        });

        if (exactMatch) {
          setTrailerKey(exactMatch.key);
        } else {
          // ✅ Score fallback if no match
          const scored = videos
            .map((vid) => {
              const name = vid.name.toLowerCase();
              let score = 0;
              if (name.includes("official")) score += 2;
              if (name.includes("trailer")) score += 1;
              if (name.includes(title)) score += 2;
              if (name.includes(`${randomMovie.release_date?.slice(0, 4)}`)) score += 1;
              return { ...vid, score };
            })
            .sort((a, b) => b.score - a.score);

          setTrailerKey(scored[0]?.key || null);
        }

        setShowTrailer(true);
      } catch (err) {
        console.error("HeroBanner fetch failed:", err);
      }
    }

    fetchMovieAndTrailer();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;
      const { top, bottom } = bannerRef.current.getBoundingClientRect();
      const isVisible = top >= 0 && bottom <= window.innerHeight;

      if (!isVisible && showTrailer) setShowTrailer(false);
      if (isVisible && !embedUrl && !showDetails && !showTrailer) setShowTrailer(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showTrailer, embedUrl, showDetails]);

  return (
    <div ref={bannerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
      {trailerKey && showTrailer && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          playing
          muted={muted}
          loop
          controls={false}
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
              },
            },
          }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 px-8 py-28 max-w-4xl space-y-6">
        <h1 className="text-5xl font-extrabold drop-shadow">{movie?.title}</h1>
        <p className="text-lg max-w-2xl">{movie?.overview}</p>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => {
              const url = `https://vidsrc.cc/v2/embed/movie/${movie?.id}`;
              setEmbedUrl(url);
              setShowTrailer(false);
              setShowDetails(false);
            }}
            className="bg-white text-black px-6 py-3 text-lg font-bold rounded hover:bg-gray-300 transition"
          >
            ▶ Play
          </button>

          <button
            onClick={() => {
              setShowTrailer(false);
              setShowDetails(true);
            }}
            className="bg-gray-700 text-white px-6 py-3 text-lg font-bold rounded hover:bg-gray-600 transition"
          >
            ℹ More Info
          </button>

          <button
            onClick={() => setMuted((prev) => !prev)}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm"
          >
            {muted ? "🔇 Unmute" : "🔊 Mute"}
          </button>
        </div>
      </div>

      {showDetails && movie && (
        <MovieDetailsModal
          movieId={movie.id}
          mediaType="movie"
          onClose={() => {
            setShowDetails(false);
            setShowTrailer(true);
          }}
          onPlayMovie={(url) => {
            setEmbedUrl(url);
            setShowDetails(false);
            setShowTrailer(false);
          }}
          onPlayEpisode={(url) => {
            setEmbedUrl(url);
            setShowDetails(false);
            setShowTrailer(false);
          }}
        />
      )}

      {embedUrl && (
        <VideoPlayerModal
          embedUrl={embedUrl}
          onClose={() => {
            setEmbedUrl(null);
            setShowTrailer(true);
          }}
        />
      )}
    </div>
  );
};

export default HeroBanner;
