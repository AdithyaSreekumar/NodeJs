const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port=3000;

app.use(express.json());


mongoose.connect("mongodb+srv://raothomas2003:iambatman@node.sqfjt.mongodb.net/Test?retryWrites=true&w=majority&appName=Node",
    {
    useNewUrlParser: true,          
    useUnifiedTopology: true,       
    })
    .then(()=>{
            console.log("Connected to MongoDB");
    })
    .catch((error)=>{
        console.log(error);
    });

app.get('/',async(req,res)=>{
    res.send('Welcome!!');
});

app.post('/register',async(req,res)=>{
    const { name, email, password, address } = req.body;
    if(!name, !email, !password, !address){
        return res.status(400).json({ status:false, error: "Fill the missing fields "});
    }
    else{
        return res.status(200).jsom({ status:true, name, email, address}); 
    }
})
// app.get('/',(req,res)=>{
//     res.send('Hello Express!'); 
// });

// app.get('/getname', async(req,res)=>{
//     try {
//         var { name } = req.query;
//         if (!name){
//             res.status(400).json({
//                 status: false,
//                 status_code:400,
//                 message: "Please provide your name",
//                 data: null
//             });
//             return;

//         }
//             console.log("name",name);
//             res.status(200).json({
//                 status: true,
//                 status_code:200,
//                 message: "Request successful",
//                 data: `Hai my name is ${name}.`
//             });
//     } catch (error) {
//        console.error(error);
//        res.status(500).json({
//         status: false,
//         status_code:500,
//         message: "Something went wrong",
//         data: null
//     });
//     }

//     var { name } = req.query;
//     if (!name){
//         res.status(400).json({
//             status: false,
//             status_code:400,
//             message: "Please provide your name",
//             data: null
//         });

//         res.status(500).json({
//             status: false,
//             status_code:400,
//             message: "Please provide your name",
//             data: null
//         });
//     }
// });

// app.use(express.json());

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});

