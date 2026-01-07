const express = require("express");
const Subscriber = require("./models/subscribers");

const app = express();

// middleware
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /subscribers/:id
 * Returns subscriber by ID
 */
app.get("/subscribers/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);

    if (!subscriber) {
      return res.status(400).json({ message: "Subscriber not found" });
    }

    res.json(subscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = app;
