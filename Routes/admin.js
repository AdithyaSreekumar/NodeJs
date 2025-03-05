const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const userModel = require("../model/userdata");
const empModel = require("../model/Employee");

router.post("/addemp", async (req, res) => {
  try {
    const { _id, quali, salary } = req.body;
    if (!_id) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "employeeId is required",
        data: null,
      });
    }
    if (!quali) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "qualification is required",
        data: null,
      });
    }
    if (!salary) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "please enter the salary",
      });
    }

    //checking employee id

    const Id = await userModel.findOne({
      _id: _id,
    });

    // const Id = await userModel.find();
    // console.log("userModel",userModel);
    // console.log("Id",Id);

    // for(i=0; i<Id.length; i++){
    //     if(Id[i]._id.toString() === _id){
    //         let data = Id[i]

    //         return res.status(400).json({
    //             status: true,
    //             status_code: 400,
    //             iteration: i,
    //             data:data,
    //             message: "employeeId already exist",
    //         })
    //     }
    // }

    // return;

    if (!Id) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "employee id is not found",
        data: null,
      });
    }

    //creayeing mew employee
    const newemp = await empModel.create({
      _id: Id.id,
      empID: Id._id,
      quali: quali,
      salary: salary,
      name: Id.name,
    });

    return res.status(200).json({
      status: true,
      status_code: 200,
      message: "employee added successfully",
      data: newemp,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      status_code: 400,
      message: "Internal Server Error",
      data: null,
    });
  }
});

router.post("/listState", async (req, res) => {
  try {
    const { name } = req.body;
   
    const result = await userModel.findOne({
        name: name
    });
    if (result.length <= 0) {
      return res.status(400).json({
        status: false,
        status_code: 400,
        message: "No user found",
        data: null,
      });
    }

    return res.status(200).json({
        status: true,
        status_code: 200,
        message: "user found",
        data: result.address.state
    })
    
        
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      status_code: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
});

module.exports = router;
