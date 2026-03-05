const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");

const SALT_ROUNDS = 10;

const app = express();
const port = 3002;
const upload = multer(); // parse multipart/form-data

// --- Middleware ---
app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json()); // handles application/json
app.use(express.urlencoded({ extended: true })); // handles x-www-form-urlencoded

// --- MongoDB connection ---
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const database = client.db("FashionData");
const fashionCollection = database.collection("Fashion");
const userCollection = database.collection("User");

// --- Routes ---
app.get("/", (req, res) => {
  res.json({ message: "Fashion MongoDB Server is running on port 3002" });
});

// POST /register
app.post("/register", upload.none(), async (req, res) => {
  const { usr, pwd } = req.body;
  if (!usr || !pwd) {
    return res
      .status(400)
      .json({ success: false, message: "usr and pwd are required." });
  }
  try {
    const existing = await userCollection.findOne({ usr });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Username already exists." });
    }
    const hashedPwd = await bcrypt.hash(pwd, SALT_ROUNDS);
    await userCollection.insertOne({ usr, pwd: hashedPwd });
    res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// POST /login
app.post("/login", upload.none(), async (req, res) => {
  const { usr, pwd } = req.body;
  if (!usr || !pwd) {
    return res
      .status(400)
      .json({ success: false, message: "usr and pwd are required." });
  }
  try {
    const user = await userCollection.findOne({ usr, pwd });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password." });
    }
    res.json({ success: true, message: "Login successful." });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// GET /fashions
app.get("/fashions", async (req, res) => {
  try {
    const result = await fashionCollection.find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error("Fashions error:", error);
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

// ex-60
app.get("/create-cookie", cors(), (req, res) => {
  res.cookie("username", "tranduythanh");
  res.cookie("password", "123456");
  account = { username: "tranduythanh", password: "123456" };
  res.cookie("account", account);
  res.send("cookies are created");
});

app.get("/read-cookie", cors(), (req, res) => {
  //cookie is stored in client, so we use req
  username = req.cookies.username;
  password = req.cookies.password;
  account = req.cookies.account;
  infor = "username = " + username + "<br/>";
  infor += "password = " + password + "<br/>";
  if (account != null) {
    infor += "account.username = " + account.username + "<br/>";
    infor += "account.password = " + account.password + "<br/>";
  }
  res.send(infor);
});

// Expires after 360000 ms from the time it is set.
app.get("/create-limited-cookie", cors(), (req, res) => {
  res.cookie("infor_limit1", "I am limited Cookie - way 1", {
    expires: new Date(Date.now() + 360000),
  });
  res.cookie("infor_limit2", "I am limited Cookie - way 2", { maxAge: 360000 });
  res.send("Limited cookies are created");
});

app.get("/clear-cookie", cors(), (req, res) => {
  res.clearCookie("username");
  res.clearCookie("password");
  res.clearCookie("account");
  res.clearCookie("infor_limit1");
  res.clearCookie("infor_limit2");
  res.send("All cookies are removed");
});

app.listen(port, () => {
  console.log(`My Server listening on port ${port}`);
});
