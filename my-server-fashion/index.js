// Due to some mistake with Git repo > Full project can be accessed at: https://github.com/nicoleebhd307/advanced-be-
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const { MongoClient, ObjectId } = require("mongodb");

const SALT_ROUNDS = 10;

const app = express();
const port = 4000;
const upload = multer(); // parse multipart/form-data

// --- Middleware ---
app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());
app.use(session({
  secret: "Shh, its a secret!",
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: "lax", httpOnly: true }
}));
app.use(express.json()); // handles application/json
app.use(express.urlencoded({ extended: true })); // handles x-www-form-urlencoded

// --- MongoDB connection ---
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const database = client.db("FashionData");
const fashionCollection = database.collection("Fashion58");


// --- Routes ---
app.get("/", (req, res) => {
  res.json({ message: "Fashion MongoDB Server is running on port 4000" });
});

// GET /fashions
app.get("/fashions", async (req, res) => {
  try {
    const result = await fashionCollection.find({}).sort({ createdAt: -1 }).toArray(); // sort by createdAt descending
    res.json(result);
  } catch (error) {
    console.error("Fashions error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// POST /fashions
app.post("/fashions", async (req, res) => {
  try {
    const { fashion_title, fashion_details, thumbnail, fashion_styles } = req.body;
    const newFashion = {
      fashion_title,
      fashion_details,
      thumbnail,
      fashion_styles,
      creation_date: new Date()
    };
    const result = await fashionCollection.insertOne(newFashion);
    res.status(201).json({ message: "Fashion created", insertedId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /fashions/:id
app.put("/fashions/:id", async (req, res) => {
  try {
    const o_id = new ObjectId(req.params.id);
    const { fashion_title, fashion_details, thumbnail, fashion_styles } = req.body;
    const result = await fashionCollection.updateOne(
      { _id: o_id },
      { $set: { fashion_title, fashion_details, thumbnail, fashion_styles } }
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ message: "Not found." });
    res.json({ message: "Fashion updated successfully." });
  } catch (error) {
    console.error("Fashion update error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// DELETE /fashions/:id
app.delete("/fashions/:id", async (req, res) => {
    try {
        const o_id = new ObjectId(req.params["id"]);
        const result = await fashionCollection.deleteOne({ _id: o_id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Fashion not found." });
        }
        res.json({ message: "Fashion deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /fashions/search/:style
app.get("/fashions/search/:style", async (req, res) => {
  const style = req.params.style;

  try {
    const result = await fashionCollection
      .find({ fashion_styles: { $regex: style, $options: "i" } })
      .toArray();

    res.json(result);
  } catch (error) {
    console.error("Fashion search error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// GET /fashions/:id
app.get("/fashions/:id", async (req, res) => {
  try {
    const o_id = new ObjectId(req.params["id"]);
    const result = await fashionCollection.findOne({ _id: o_id });
    if (!result) return res.status(404).json({ message: "Not found." });
    res.json(result);
  } catch (error) {
    console.error("Fashion by ID error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});



// --- Start server ---
app.listen(port, () => {
  console.log(`Fashion server is running at: http://localhost:${port}`);
});