const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port=3000;
const cors = require('cors');
const userModel = require('./model/userdata');
const auth = require('./Routes/auth');
// const login =require('./Routes/login');
// const listall = require('./Routes/listall');
const view = require('./Routes/view');

app.use(express.json());
app.use(cors());

app.use('/auth',auth);
// app.use('/login',login);
// app.use('/listall',listall);
app.use('/view',view);



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



// app.post('/register',async(req,res)=>{
//     const { name, email, password, address } = req.body;
//     // console.log("req",req.body);
//     if(!name, !email, !password, !address){
//         return res.status(400).json({ status:false, error: "Fill the missing fields "});
//     }
//     else{
//         return res.status(200).json({ status:true, name, email, password, address}); 
//     }
// })

// app.post('/register',async(req,res)=>{
//     try{
//         const { name, email, password, address } = req.body;
//         const user = await userModel.create(
//             {
//                 name : name,
//                 email : email,
//                 password : password,
//                 address : address
//             }
//         );
//         return res.status(200).json({
//             status:true,
//             status_code:400,
//             message:"User created successfully",
//             data:user
//         });
//     }
//     catch(error){
//         console.log(error);
//     }
// });



// app.post("/login",async(req,res)=>{
//     try{

//         const { email, password } = req.body;




//         const mail=await userModel.findOne({email: email});

//         if(mail){
//             const result = password === mail.password;
//             if(result){
//                 return res.status(200).json({ 
//                     status:true, 
//                     status_code:200,
//                     message:"Email Exists",
//                     data:null
//                 });
//             }
//             else{
//                 return res.status(200).json({ 
//                     status:false, 
//                     status_code:200,
//                     error:"Invalid indentails",
//                     data:null
//                 });
//             }
//         }
//         else{
//             console.log("User not found");
//             return res.status(400).json({ 
//                 status:false,
//                 status_code:400, 
//                 error:"User not Found",
//                 data:null,
//             });
//         }
//     } catch(error){
//         console.error(error);
//     }
// })


// app.post("/listall",async(req,res)=>{
//     try{
//         const list= await userModel.find();
//         if(list.length <= 0){
//             return res.status(400).json({
//                 status:false,
//                 status_code:400,
//                 message:"No users found",
//                 data:null
//             });
//         }
        
//         return res.status(200).json({
//             status:true,
//             data: list, 
//             message:"users found"
//         });
//     }
//     catch(error){
//         console.error(error);
//     }
// })


// app.post("/listbyId",async(req,res)=>{
//     try{
//         const {id} = req.body;
//         const item= await userModel.findOne(
//             { userid: id }
//         );
//         if(!item){
//             return res.status(400).json({
//                 status:false,
//                 status_code:400,
//                 error:"User not found",
//                 data:null
//             })
//         }
//         else{
//             return res.status(200).json({
//                 status:true,
//                 status_code:200,
//                 message:"User data retreived successfully",
//                 data:item
//             })
//         }
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).json({
//              status: false,
//              status_code:500,
//              message: "Something went wrong",
//              data: null
//          });
//     }
// })















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