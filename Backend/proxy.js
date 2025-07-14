const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { getHDTodayzStream } = require("./hdtodayz");

// (Optional) Your previous cache-related code here if you want caching

// HDTodayz stream route: expects full slug path as query parameter `slug`
// Example: /stream/hdtodayz?slug=watch-movie/watch-kpop-demon-hunters-hd-127117.12390442
router.get("/hdtodayz", async (req, res) => {
  const { slug } = req.query;
  if (!slug) {
    return res.status(400).json({ error: "Missing slug parameter" });
  }

  try {
    const streamUrl = await getHDTodayzStream(slug);
    if (streamUrl) {
      return res.json({ stream: streamUrl });
    } else {
      throw new Error("No stream URL found");
    }
  } catch (err) {
    console.warn("❌ Stream fetch error:", err.message);
    return res.status(404).json({ error: "Stream not found" });
  }
});

// Export router
module.exports = router;
