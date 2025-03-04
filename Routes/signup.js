const express = require('express');
const  mongoose = require("mongoose");
const router = express.Router();
const userModel = require('../model/userdata');


router.post('/',async(req,res)=>{
    try{
        const { name, email, password, address } = req.body;
        const user = await userModel.create(
            {
                name : name,
                email : email,
                password : password,
                address : address
            }
        );
        return res.status(200).json({
            status:true,
            status_code:400,
            message:"User created successfully",
            data:user
        });
    }
    catch(error){
        console.log(error);
    }
});






module.exports = router;