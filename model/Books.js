const mongoose = require("mongoose");

const books = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, required: true, default: true },
});

const booksModel = mongoose.model("booksModel", books);

module.exports = booksModel;
