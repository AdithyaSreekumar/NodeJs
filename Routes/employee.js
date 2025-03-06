const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const booksModel = require("../model/Books");
const empModel = require("../model/Employee");
const userModel = require("../model/userdata");

//add book
router.post("/addbook", async (req, res) => {
  try {
    const { title, author, genre, price } = req.body;
    if (!title) {
      res.status(400).json({
        status: false,
        status_code: 400,
        message: "Please enter title",
        data: null,
      });
    }
    if (!author) {
      res.status(400).json({
        status: false,
        status_code: 400,
        message: "Please enter author",
        data: null,
      });
    }
    if (!genre) {
      res.status(400).json({
        status: false,
        status_code: 400,
        message: "Please enter genre",
        data: null,
      });
    }
    // if(!year){
    //     res.status(400).json({
    //         status:false,
    //         status_code:400,
    //         message: 'Please enter year',
    //         data:null
    //     })
    // }
    if (!price) {
      res.status(400).json({
        status: false,
        status_code: 400,
        message: "Please enter price",
        data: null,
      });
    }
    const book = await booksModel.create({
      title: title,
      author: author,
      genre: genre,
      // year:year,
      price: price,
    });
    return res.status(200).json({
      status: true,
      status_code: 200,
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      status_code: 500,
      message: "Internal server error",
      data: null,
    });
  }
});

//List all books
router.post("/listall", async (req, res) => {
  try {
    const list = await booksModel.find();
    if (list.length <= 0) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "No books found",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      status_code: 200,
      message: "All books are listed",
      data: list,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      status_code: 500,
      message: "Something went wrong",
      data: null,
    });
  }
});

//Delete a book
router.delete("/delete", async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Please provide the id of the book to delete",
        data: null,
      });
    } else {
      const deletedBook = await booksModel.findByIdAndDelete(_id);
      if (!deletedBook) {
        return res.status(400).json({
          status: false,
          status_code: 400,
          message: "Book not found",
          data: null,
        });
      } else {
        return res.status(200).json({
          status: true,
          status_code: 200,
          message: "Book deleted successfully",
          data: null,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      status_code: 400,
      message: "Internal Server Error",
      data: null,
    });
  }
});

//Update a book data
router.put("/update", async (req, res) => {
  try {
    const { _id, title, author, genre, price } = req.body;
    if (!_id) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "Please provide the id of the book to update",
        data: null,
      });
    } else {
      const updated = await booksModel.findOneAndUpdate(
        { _id: _id },
        { title, author, genre, price },
        { new: true }
      );
      if (!updated) {
        return res.status(400).json({
          status: false,
          status_code: 400,
          message: "Book not found",
          data: null,
        });
      } else {
        return res.status(200).json({
          status: true,
          status_code: 200,
          message: "Book updated successfully",
          data: updated,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      status_code: 400,
      message: "Internal Server Error",
      data: null,
    });
  }
});



//lenting Book
router.put("/lentBook", async (req, res) => {
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
    const updated = await booksModel.findOneAndUpdate(
      { _id: book._id },
      { available: false },
      { new: true }
    );
    if (updated) {
      return res.status(200).json({
        status: true,
        status_code: 200,
        message: "Book has been lent successfully",
        data: updated,
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
