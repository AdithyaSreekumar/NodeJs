const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port=3000;
const userModel = require('./model/userdata');

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

app.post('/register',async(req,res)=>{
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
        return res.status(200).json(user);
    }
    catch(error){
        console.log(error);
    }
});


// const newUser= new userModel({
//     name: "gladson mathew",
//     email: "gladsonmathew7@gmail.com",
//     password: "itsgladson"
// })

// newUser.save()
//     .then(user => console.log("User created:",user))
//     .catch(err=> console.error('Error creating user: ',err))


// userModel.create({
//     name: "alan jose",
//     email: "alanjose@gmail.com",
//     password: "alanjose"
// })
//     .then(user=> console.log("User created successfully",user))
//     .catch(err=> console.error('Error creating user: ',err))


app.post("/login",async(req,res)=>{
    try{

        const { email, password } = req.body;




        const mail=await userModel.findOne({email: email});

        if(mail){
            const result = password === mail.password;
            if(result){
                return res.status(200).json({ status:true, message:"Email Exists"});
            }
            else{
                return res.status(200).json({ status:false, error:"Invalid indentails"});
            }
        }
        else{
            console.log("User not found");
            return res.status(200).json({ status:false, error:"User not Found"});
        }
    } catch(error){
        console.error(error);
    }
})


app.post("/listall",async(req,res)=>{
    try{
        // const {id,name,email,password,address} = userModel;
        const list= await userModel.find();
        if(list.length <= 0){
            return res.status(400).json({
                status:false,
                status_code:400,
                message:"No users found",
            });
        }
        
        return res.status(200).json({
            status:true,
            data: list, 
            message:"users found"
        });
    }
    catch(error){
        console.error(error);
    }
})


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

