const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const empModel = require("../model/Employee");
const userModel = require("../model/userdata");
const booksModel = require("../model/Books");
const lendModel = require("../model/lending");

//lending book
router.post("/borrow", async (req, res) => {
  try {
    const { empid, custid, bookid } = req.body;
    const employee = await empModel.findOne({ _id: empid });
    const customer = await userModel.findOne({ _id: custid });
    const book = await booksModel.findOne({ _id: bookid });
    if (!empid) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Please provide the id of the employee to lend the book",
        data: null,
      });
    }
    if (employee == null) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Employee not found",
        data: null,
      });
    }
    if (!custid) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Please provide the id of the customer to lend the book",
        data: null,
      });
    }
    if (customer == null) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Customer not found",
        data: null,
      });
    }
    if (!bookid) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Please provide the id of the book to lend the book",
        data: null,
      });
    }
    if (book == null) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Book not found",
        data: null,
      });
    }
    if (book.available == true) {
      const history = await lendModel.create({
        empID: empid,
        custID: custid,
        bookID: bookid,
        lendDate: new Date(),
        returnDate: null,
      });
      await booksModel.findOneAndUpdate(
        { _id: bookid },
        { available: false },
        { new: true }
      );

      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Book has been lend successfully",
        data: history,
      });
    } else {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Book is not available",
        data: null,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      status_code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
});

//returning book
router.put("/returnBook", async (req, res) => {
  try {
    const { empid, custid, bookid } = req.body;
    const employee = await empModel.findOne({ _id: empid });
    const customer = await lendModel.find({ custID: custid });
    const state = await lendModel.find({ bookID: bookid });
    const book = await booksModel.findOne({ _id: bookid });
    if (!empid) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Please provide the id of the employee to lend the book",
        data: null,
      });
    }
    if (employee == null) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Employee not found",
        data: null,
      });
    }
    if (!custid) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Please provide the id of the customer to return the book",
        data: null,
      });
    }
    if (customer == null) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "User has not borrowed any book",
        data: null,
      });
    }
    if (!bookid) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Please provide the id of the book to return the book",
        data: null,
      });
    }
    if (book == null) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Book not found",
        data: null,
      });
    }
    if (state.status != "return") {
      const history = await lendModel.findOneAndUpdate(
        { bookID: bookid, status: "lend" },
        { returnDate: new Date(), status: "return" },
        { new: true }
      );

      await booksModel.findOneAndUpdate(
        { _id: bookid },
        { available: true },
        { new: true }
      );

      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Book returned successfully",
        data: history,
      });
    } else {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Book is already returned",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      status_code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
});




module.exports = router;
