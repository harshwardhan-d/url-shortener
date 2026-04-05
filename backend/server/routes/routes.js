const express = require("express")
const router = express.Router()
const { nanoid } = require("nanoid")
const Url = require("../models/url")

router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body

    if (!originalUrl) {
      return res.status(400).json({ message: "URL is required" })
    }

    if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
      return res.status(400).json({ message: "Invalid URL, must start with http:// or https://" })
    }

    const existing = await Url.findOne({ originalUrl })
    if (existing) {
      return res.json({ shortUrl: `https://url-shortener-zd21.onrender.com/${existing.shortCode}` })
    }

    const shortCode = nanoid(6)
    await Url.create({ shortCode, originalUrl })

    res.json({ shortUrl: `https://url-shortener-zd21.onrender.com/${shortCode}` })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code })

    if (!url) {
      return res.status(404).json({ message: "URL not found" })
    }

    res.redirect(url.originalUrl)

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router