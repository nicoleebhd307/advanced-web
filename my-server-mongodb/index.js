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
const port = 3002;
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
const fashionCollection = database.collection("Fashion");
const userCollection = database.collection("User");
const product63Collection = database.collection("Product63");

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

// ex - 62
app.get("/contact", cors(), (req, res) => {
  if (req.session.visited != null) {
    req.session.visited++;
    res.send("You visited this page " + req.session.visited + " times");
  } else {
    req.session.visited = 1;
    res.send("Welcome to this page for the first time!");
  }
});

// ======================= ex - 63: Shopping Cart (Session) =======================

const SEED_PRODUCTS_63 = [
  { name: "Nhẫn Kim Cương Solitaire Classic", price: 15900000, image: "https://picsum.photos/seed/ring1/300/300", description: "Nhẫn kim cương 1 viên chủ 0.3ct, vàng trắng 18K", stock: 20, carat: 0.3, material: "Vàng trắng 18K", clarity: "VS1", color: "G" },
  { name: "Nhẫn Kim Cương Halo Rose Gold", price: 28500000, image: "https://picsum.photos/seed/ring2/300/300", description: "Nhẫn kim cương viên chủ 0.5ct, halo đá phụ, vàng hồng 18K", stock: 15, carat: 0.5, material: "Vàng hồng 18K", clarity: "VVS2", color: "F" },
  { name: "Nhẫn Kim Cương Eternity Band", price: 42000000, image: "https://picsum.photos/seed/ring3/300/300", description: "Nhẫn eternity toàn kim cương 1.0ct tổng, vàng 18K", stock: 10, carat: 1.0, material: "Vàng vàng 18K", clarity: "VS2", color: "H" },
  { name: "Nhẫn Kim Cương Princess Cut", price: 67000000, image: "https://picsum.photos/seed/ring4/300/300", description: "Nhẫn kim cương cắt vuông Princess 1.2ct, bạch kim Pt950", stock: 8, carat: 1.2, material: "Bạch kim Pt950", clarity: "VVS1", color: "E" },
  { name: "Nhẫn Kim Cương Cushion Halo", price: 89000000, image: "https://picsum.photos/seed/ring5/300/300", description: "Nhẫn kim cương cắt Cushion 1.5ct, halo vi kim cương, vàng trắng 18K", stock: 6, carat: 1.5, material: "Vàng trắng 18K", clarity: "IF", color: "D" },
  { name: "Nhẫn Kim Cương Oval Solitaire", price: 125000000, image: "https://picsum.photos/seed/ring6/300/300", description: "Nhẫn kim cương cắt Oval 2.0ct, bạch kim Pt950, chứng nhận GIA", stock: 4, carat: 2.0, material: "Bạch kim Pt950", clarity: "FL", color: "D" },
];

// GET /ex63/products — auto-seed if empty
app.get("/ex63/products", async (req, res) => {
  try {
    let products = await product63Collection.find({}).toArray();
    if (products.length === 0) {
      await product63Collection.insertMany(SEED_PRODUCTS_63);
      products = await product63Collection.find({}).toArray();
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /ex63/cart
app.get("/ex63/cart", (req, res) => {
  res.json({ cart: req.session.cart63 || [] });
});

// POST /ex63/cart/add — body: { productId, qty }
app.post("/ex63/cart/add", async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId) return res.status(400).json({ success: false, message: "productId is required" });
  try {
    const product = await product63Collection.findOne({ _id: new ObjectId(productId) });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    if (!req.session.cart63) req.session.cart63 = [];
    const cart = req.session.cart63;
    const existingIndex = cart.findIndex(item => item._id === productId);
    if (existingIndex >= 0) {
      cart[existingIndex].qty += (parseInt(qty) || 1);
    } else {
      cart.push({ _id: productId, name: product.name, price: product.price, image: product.image, qty: parseInt(qty) || 1 });
    }
    req.session.cart63 = cart;
    res.json({ success: true, cart: req.session.cart63 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /ex63/cart/update — body: { items: [{ _id, name, price, image, qty }] }
app.put("/ex63/cart/update", (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ success: false, message: "items must be an array" });
  req.session.cart63 = items.filter(item => item.qty > 0);
  res.json({ success: true, cart: req.session.cart63 });
});

// DELETE /ex63/cart/clear
app.delete("/ex63/cart/clear", (req, res) => {
  req.session.cart63 = [];
  res.json({ success: true, message: "Cart cleared" });
});

// ======================= end ex - 63 =======================

app.listen(port, () => {
  console.log(`My Server listening on port ${port}`);
});