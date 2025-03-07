const mongoose = require("mongoose");
const lendData = new mongoose.Schema({
  empID: {
    type: mongoose.Schema.ObjectId,
    ref: "empModel",
    required : true
  },
  custID: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required :true
  },
  bookID: {
    type: mongoose.Schema.ObjectId,
    ref: "bookModel",
    required :true
  },
  lendDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["lend", "return"],
    default: "lend",
    require : true
  },
});


const lendModel = mongoose.model("lendModel",lendData);

module.exports = lendModel;