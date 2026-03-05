const express = require("express");
const app = express();
const cors=require("cors");
app.use(cors()); // cho phep tat ca cac domain co the truy cap vao API cua minh
const port = 3000; // chay tu 0 => 65535, khong chon mac dinh trung voi he dieu hanh/ he thong
// 1433 : MS SQL
// 3306 : MySQL
// 5432 : PostgreSQL
// 27017 : MongoDB
const morgan = require("morgan");
app.use(morgan("combined")); // ghi log chi tiet hon

const path = require("path");
app.use(express.static(path.join(__dirname, "public"))); // su dung thu muc public lam thu muc chua cac file tĩnh

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // request va response
  res.send("Hello World!");
});

let idols = [
  { id: 1, name: "Namjoon", age: 32, image: "images/nj.png" },
  { id: 2, name: "Jungkook", age: 29, image: "images/jk.png" },
  { id: 3, name: "Taehyung", age: 31, image: "images/kth.png" },
  { id: 4, name: "Jin", age: 35, image: "images/jin.png" },
  { id: 5, name: "Cha Eun Woo", age: 29, image: "images/cew.png" },
  { id: 6, name: "J-Hope", age: 29, image: "images/jhope.png" },
];
app.get("/idols", (req, res) => {
  // request va response
  let tbl =
    '<table border="1"><tr><th>ID</th><th>Name</th><th>Age</th><th>Image</th></tr>';
  idols.forEach((item) => {
    tbl += `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td><img src="${item.image}" alt="${item.name}" width="100"/></td>
                </tr>`;
  });
  tbl += "</table>";
  res.send(tbl);
});

// Exercise 38: create HTTP GET - List of Books
app.get("/books", (req, res) => {
  res.send(books);
});

let books = [
  {
    BookId: "b1",
    BookName: "Lập trình Java căn bản",
    Price: 70,
    Image: "b1.png",
  },
  {
    BookId: "b2",
    BookName: "Lập trình và Cuộc sống",
    Price: 100,
    Image: "b2.png",
  },
  { BookId: "b3", BookName: "100 bài tập lập trình Javascripts", Price: 200, Image: "b3.png" },
  { BookId: "b4", BookName: "Kỹ thuật lập trình C cơ bản", Price: 300, Image: "b4.png" },
  {
    BookId: "b5",
    BookName: "Kỹ thuật lập trình C nâng cao",
    Price: 250,
    Image: "b5.png",
  },
];
app.get("/books", (req, res) => {
  res.send(books);
});

// Bài 50 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let ex50 = require("./public/datasets/books.json");

// GET all
app.get("/exercise50", (req, res) => {
  res.json(ex50);
});

// GET by id
app.get("/exercise50/:id", (req, res) => {
  const book = ex50.find(b => b.id == req.params.id);
  res.json(book);
});

// POST create book
const multer = require('multer');

const storage = multer.diskStorage({
  destination: "public/book_img/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.post("/exercise50", upload.single("image"), (req, res) => {
  const newBook = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    description: req.body.description,
    image: req.file.filename
  };

  ex50.push(newBook);
  res.json(newBook);
});

// PUT update book

app.put("/exercise50/:id", upload.single("image"), (req, res) => {
  const book = ex50.find(b => b.id == req.params.id); 
  if (book) {
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.price = req.body.price || book.price;
    book.description = req.body.description || book.description;
    if (req.file) {
      book.image = req.file.filename;
    }
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// DELETE book
app.delete("/exercise50/:id", (req, res) => {
  const index = ex50.findIndex(b => b.id == req.params.id);
  if (index !== -1) {
    const deletedBook = ex50.splice(index, 1);
    res.json(deletedBook);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/*app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.json({ message: "Deleted successfully" });
});
 */

// Start server - MUST BE AT THE END
app.listen(port, () => {
  console.log(`Server is running at http://172.20.10.7:${port}`);
});
