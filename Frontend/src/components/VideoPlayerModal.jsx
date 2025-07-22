// src/components/VideoPlayerModal.jsx
import React from "react";

const VideoPlayerModal = ({ embedUrl, onClose, familyMode }) => {
  if (!embedUrl) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-6xl aspect-video rounded overflow-hidden shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-white text-black px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
        >
          ✕
        </button>

        {/* Always render iframe */}
        <iframe
          src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1${familyMode ? "&muted=true" : ""}`}
          title="Movie Player"
          className="w-full h-full rounded"
          allowFullScreen
          allow="autoplay; encrypted-media"
          sandbox="allow-same-origin allow-scripts allow-presentation"
          referrerPolicy="no-referrer"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default VideoPlayerModal;
