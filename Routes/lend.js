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
    // const available = await booksModel.findOne({ _id: bookid });
    if (book.available == true) {
      const history = await lendModel.create(
        { empID: empid ,
         custID: custid ,
         bookID: bookid ,
         $currentDate: {lendDate:true},
        returnDate: null},
      );
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

module.exports = router;
