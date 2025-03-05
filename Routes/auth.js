const express = require('express');
const  mongoose = require("mongoose");
const router = express.Router();
const userModel = require('../model/userdata');



//Signup
router.post('/signup',async(req,res)=>{
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
        if(!email){
            res.status(400).json({
                status:false,
                status_code:400,
                message:"Please provide your email",
                data:null
            })
         }
         if(!password){
            res.status(400).json({
                status:false,
                status_code:400,
                message:"Please provide your password",
                data:null
            })
         }
        if(!address){
            res.status(400).json({
                status:false,
                status_code:400,
                message:"Please provide your address",
                data:null
            })
         }
        
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
            status_code:200,
            message:"User created successfully",
            data:user
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
});



//Login

router.post("/login",async(req,res)=>{
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


//List All Users
router.post("/listall",async(req,res)=>{
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

//View one account
router.post("/viewbyid",async(req,res)=>{
    try{
        const {_id} = req.body;
        if(!_id){
            res.status(400).json({
                status:false,
                status_code:400,
                message:"Please provide an id",
                data:null
            })
         }
        else{
        const item= await userModel.findOne(
            { _id: _id }
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
    }}
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