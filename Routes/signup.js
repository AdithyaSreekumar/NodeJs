const express = require('express');
const  mongoose = require("mongoose");
const router = express.Router();
const userModel = require('../model/userdata');


router.post('/',async(req,res)=>{
    try{
        const { name, email, password, address } = req.body;
        if(!name){
            res.status(400).json({
                status:false,
                status_code:400,
                message:"Please provide your name",
                data:null
            })
        }
        else if(!email){
            res.status(400).json({
                status:false,
                status_code:400,
                message:"Please provide your email",
                data:null
            })
         }
         else if(!password){
            res.status(400).json({
                status:false,
                status_code:400,
                message:"Please provide your password",
                data:null
            })
         }
         else if(!address){
            res.status(400).json({
                status:false,
                status_code:400,
                message:"Please provide your address",
                data:null
            })
         }
        else{
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
        }}
        catch(error){
                console.log(error);
                res.status(500).json({
                    status: false,
                    status_code:500,
                    message: "Something went wrong",
                    data: null
                });

        
    }
});






module.exports = router;