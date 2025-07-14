// src/components/MovieRow.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieDetailsModal from "./MovieDetailsModal";
import VideoPlayerModal from "./VideoPlayerModal";

const MovieRow = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState([]);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedMediaType, setSelectedMediaType] = useState("movie");
  const [playSource, setPlaySource] = useState(null);

  const rowRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(fetchURL);
        const results = response.data.results.map((item) => ({
          ...item,
          media_type: item.media_type || (item.name ? "tv" : "movie"),
        }));
        setMovies(results);
      } catch (err) {
        console.error("Error fetching content:", err);
      }
    };

    fetchMovies();
  }, [fetchURL]);

  const handleScroll = (direction) => {
    const container = rowRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const checkScroll = () => {
    const container = rowRef.current;
    if (!container) return;
    setShowLeft(container.scrollLeft > 10);
    setShowRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 10
    );
  };

  return (
    <div className="mb-8 px-8 relative group">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {showLeft && (
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full text-white hidden group-hover:block"
        >
          <FaChevronLeft size={20} />
        </button>
      )}

      {showRight && (
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-90 p-2 rounded-full text-white hidden group-hover:block"
        >
          <FaChevronRight size={20} />
        </button>
      )}

      <div
        ref={rowRef}
        onScroll={checkScroll}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {movies.map((movie) => (
          <div key={`${movie.id}-${movie.media_type}`} className="relative flex-shrink-0">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title || movie.name}
              className="max-w-[180px] rounded hover:scale-105 transform transition duration-300 cursor-pointer"
              onClick={() => {
                setSelectedMovieId(movie.id);
                setSelectedMediaType(movie.media_type);
              }}
            />
          </div>
        ))}
      </div>

      {selectedMovieId && (
        <MovieDetailsModal
          movieId={selectedMovieId}
          mediaType={selectedMediaType}
          onClose={() => setSelectedMovieId(null)}
          onPlayMovie={(url) => {
            setPlaySource(url);
            setSelectedMovieId(null);
          }}
          onPlayEpisode={(url) => {
            setPlaySource(url);
            setSelectedMovieId(null);
          }}
        />
      )}

      {playSource && (
        <VideoPlayerModal
          embedUrl={playSource}
          onClose={() => setPlaySource(null)}
        />
      )}
    </div>
  );
};

export default MovieRow;
