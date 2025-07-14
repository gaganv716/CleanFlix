// src/components/MovieDetailsModal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player/youtube";

const TMDB_API_KEY = "362dc1a026944ec0f801be34ae6fff8d";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetailsModal = ({
  movieId,
  mediaType = "movie",
  onClose,
  onPlayMovie,
  onPlayEpisode,
}) => {
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [imdbId, setImdbId] = useState(null); // ✅

  useEffect(() => {
    const fetchAllDetails = async () => {
      try {
        const [detailsRes, creditsRes, videoRes, externalIdRes] = await Promise.all([
          axios.get(`${BASE_URL}/${mediaType}/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`),
          axios.get(`${BASE_URL}/${mediaType}/${movieId}/credits?api_key=${TMDB_API_KEY}`),
          axios.get(`${BASE_URL}/${mediaType}/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`),
          axios.get(`${BASE_URL}/${mediaType}/${movieId}/external_ids?api_key=${TMDB_API_KEY}`),
        ]);

        setDetails(detailsRes.data);
        setCast(creditsRes.data.cast.slice(0, 5));
        setImdbId(externalIdRes.data.imdb_id || null); // ✅

        const trailer = videoRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer?.key || null);

        if (mediaType === "tv") {
          const seasonList = detailsRes.data.seasons?.filter((s) => s.season_number !== 0);
          setSeasons(seasonList);
          if (seasonList.length > 0) setSelectedSeason(seasonList[0].season_number);
        }
      } catch (err) {
        console.error("Modal fetch error:", err);
      }
    };

    if (movieId) fetchAllDetails();
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [movieId, mediaType]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (mediaType !== "tv" || selectedSeason == null) return;
      try {
        const res = await axios.get(
          `${BASE_URL}/tv/${movieId}/season/${selectedSeason}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        setEpisodes(res.data.episodes || []);
      } catch (err) {
        console.error("Episode fetch error:", err);
      }
    };

    fetchEpisodes();
  }, [selectedSeason, mediaType, movieId]);

  if (!details) return null;

  // ✅ Updated playback using IMDb ID and Vidsrc v2 API
  const handlePlayMovie = () => {
    if (!imdbId) return;
    const embedUrl = `https://vidsrc.cc/v2/embed/movie/${imdbId}?autoPlay=true`;
    onPlayMovie?.(embedUrl);
  };

  const handlePlayEpisode = (ep) => {
    if (!imdbId) return;
    const embedUrl = `https://vidsrc.cc/v2/embed/tv/${imdbId}/${selectedSeason}/${ep.episode_number}?autoPlay=true`;
    onPlayEpisode?.(embedUrl);
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/80 overflow-y-auto flex justify-center items-start pt-16"
      onClick={onClose}
    >
      <div
        className="max-w-5xl w-full bg-[#111] p-6 text-white relative rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl bg-gray-700 px-3 py-1 rounded hover:bg-red-600"
        >
          ✕
        </button>

        <h2 className="text-4xl font-bold mb-2">{details.title || details.name}</h2>
        <p className="mb-4 text-gray-300">{details.overview}</p>

        <h3 className="text-xl font-semibold mb-2">Top Cast:</h3>
        <ul className="flex space-x-4 mb-6">
          {cast.map((actor) => (
            <li key={actor.cast_id || actor.credit_id} className="text-sm text-gray-400">
              <div className="w-20 h-28 overflow-hidden rounded bg-gray-800">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs">No Image</div>
                )}
              </div>
              <p className="mt-1 text-center">{actor.name}</p>
            </li>
          ))}
        </ul>

        {trailerKey && (
          <div className="mb-6 w-full aspect-video rounded overflow-hidden">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailerKey}`}
              controls
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    fs: 1,
                    vq: "hd1080",
                  },
                },
              }}
            />
          </div>
        )}

        {mediaType === "movie" && (
          <button
            className="mt-4 bg-white text-black px-6 py-2 font-bold rounded hover:bg-gray-300 transition"
            onClick={handlePlayMovie}
            disabled={!imdbId}
          >
            ▶ Play Movie
          </button>
        )}

        {mediaType === "tv" && (
          <div>
            <label className="block mb-2 text-lg font-semibold">Select Season:</label>
            <select
              value={selectedSeason || ""}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
              className="mb-4 p-2 bg-gray-800 text-white rounded"
            >
              {seasons.map((season) => (
                <option key={season.id} value={season.season_number}>
                  {season.name}
                </option>
              ))}
            </select>

            <div className="space-y-4">
              {episodes.map((ep) => (
                <div
                  key={ep.id}
                  className="bg-gray-900 p-4 rounded-lg flex gap-4 relative group cursor-pointer"
                  onClick={() => handlePlayEpisode(ep)}
                >
                  <div className="relative min-w-[240px] w-[240px] h-[135px] rounded overflow-hidden bg-gray-800 flex-shrink-0">
                    <img
                      src={
                        ep.still_path
                          ? `https://image.tmdb.org/t/p/w300${ep.still_path}`
                          : "https://via.placeholder.com/240x135?text=No+Image"
                      }
                      alt={ep.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 flex items-center justify-center transition duration-300">
                      <span className="text-white text-3xl opacity-80 group-hover:opacity-100 transform scale-100 group-hover:scale-110 transition">
                        ▶
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold">
                      {`Episode ${ep.episode_number}: ${ep.name}`}
                    </h4>
                    {ep.runtime && <p className="text-sm text-gray-400">{ep.runtime} min</p>}
                    <p className="text-sm text-gray-300">{ep.overview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsModal;
