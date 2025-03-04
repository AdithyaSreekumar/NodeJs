const express = require('express');
const  mongoose = require("mongoose");
const router = express.Router();
const userModel = require('../model/userdata');

router.post("/",async(req,res)=>{
    try{
        const {id} = req.body;
        const item= await userModel.findOne(
            { userid: id }
        );
        if(!item){
            return res.status(400).json({
                status:false,
                status_code:400,
                error:"User not found",
                data:null
            })
        }
        else{
            return res.status(200).json({
                status:true,
                status_code:200,
                message:"User data retreived successfully",
                data:item
            })
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({
             status: false,
             status_code:500,
             message: "Something went wrong",
             data: null
         });
    }
})


module.exports = router;