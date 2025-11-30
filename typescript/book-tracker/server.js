const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/booktracker")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


const BookModel = mongoose.model("Book", new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  pagesRead: Number,
  status: String,
  format: String,
  price: Number,
  suggestedBy: String,
  finished: Boolean
}));


app.get("/books", async (req, res) => {
  const books = await BookModel.find();
  res.json(books);
});


app.post("/books", async (req, res) => {
  const data = req.body;

  const finished = data.pagesRead >= data.pages;

  const book = new BookModel({
    ...data,
    finished
  });

  await book.save();
  res.json(book);
});


app.delete("/books/:id", async (req, res) => {
  await BookModel.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
