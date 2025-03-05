const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port=3000;
const cors = require('cors');

const userModel = require('./model/userdata');
const booksModel = require('./model/Books');
const empModel = require("./model/Employee");

const auth = require('./Routes/auth');
const emp = require('./Routes/employee');


app.use(express.json());
app.use(cors());

app.use('/auth',auth);
app.use('/emp',emp);



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



app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});









// app.post('/login',async(req,res)=>{
//     const { email, password } =req.body;
//     if(!email ,!password){
//         return res.status(400).json({ status:false, error: "Fill the missing fields "});
//     }
//     else{
//         return res.status(200).json({ status:true, email, password });
//     }
// })


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

//         
//     }
// });

// app.use(express.json());