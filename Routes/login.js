const express = require('express');
const  mongoose = require("mongoose");
const router = express.Router();
const userModel = require('../model/userdata');

router.post("/",async(req,res)=>{
    try{

        const { email, password } = req.body;

        const mail=await userModel.findOne({email: email});

        if(mail){
            const result = password === mail.password;
            if(result){
                return res.status(200).json({ 
                    status:true, 
                    status_code:200,
                    message:"Email Exists",
                    data:null
                });
            }
            else{
                return res.status(200).json({ 
                    status:false, 
                    status_code:200,
                    error:"Invalid indentails",
                    data:null
                });
            }
        }
        else{
            console.log("User not found");
            return res.status(400).json({ 
                status:false,
                status_code:400, 
                error:"User not Found",
                data:null,
            });
        }
    } catch(error){
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