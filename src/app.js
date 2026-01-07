const express = require("express");
const Subscriber = require("./models/subscribers");

const app = express();

// Middleware
app.use(express.json());

/**
 * GET /subscribers
 * Returns all subscribers
 */
app.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    console.error(error); // log server-side errors
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * GET /subscribers/names
 * Returns only name and subscribedChannel
 */
app.get("/subscribers/names", async (req, res) => {
  try {
    const subscribers = await Subscriber.find(
      {},
      { _id: 0, name: 1, subscribedChannel: 1 }
    );
    res.json(subscribers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * GET /subscribers/:id
 * Returns subscriber by ID
 * Handles invalid ObjectId and not found
 */
app.get("/subscribers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format before querying
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid subscriber ID" });
    }

    const subscriber = await Subscriber.findById(id);
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    res.json(subscriber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = app;
