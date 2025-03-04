const express = require('express');
const  mongoose = require("mongoose");
const router = express.Router();
const userModel = require('../model/userdata');

router.post("/",async(req,res)=>{
    try{
        const list= await userModel.find();
        if(list.length <= 0){
            return res.status(400).json({
                status:false,
                status_code:400,
                message:"No users found",
                data:null
            });
        }
        
        return res.status(200).json({
            status:true,
            data: list, 
            message:"users found"
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            status: false,
            status_code:500,
            message: "Something went wrong",
            data: null
        });
    }
})

module.exports = router;