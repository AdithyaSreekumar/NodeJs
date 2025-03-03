const express = require('express');
const app = express();
const port=3000;

const mongoose = require('mongoose');

mongoosemongoose.connect("mongodb+srv://raothomas2003:iambatman@node.sqfjt.mongodb.net/?retryWrites=true&w=majority&appName=Node")


app.get('/',(req,res)=>{
    res.send('Hello Express!'); 
});

app.get('/getname', async(req,res)=>{
    try {
        var { name } = req.query;
        if (!name){
            res.status(400).json({
                status: false,
                status_code:400,
                message: "Please provide your name",
                data: null
            });
            return;

        }
            console.log("name",name);
            res.status(200).json({
                status: true,
                status_code:200,
                message: "Request successful",
                data: `Hai my name is ${name}.`
            });
    } catch (error) {
       console.error(error);
       res.status(500).json({
        status: false,
        status_code:500,
        message: "Something went wrong",
        data: null
    });
    }

    var { name } = req.query;
    if (!name){
        res.status(400).json({
            status: false,
            status_code:400,
            message: "Please provide your name",
            data: null
        });

        res.status(500).json({
            status: false,
            status_code:400,
            message: "Please provide your name",
            data: null
        });
    }
});

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});

