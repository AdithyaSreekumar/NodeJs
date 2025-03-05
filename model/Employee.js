const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    employeeId:{type:String,required:true,unique:true},
    quali:{type:String,required:true},
    salary:{type:String,required:true}    
})

const empModel = mongoose.model("empModel",employeeSchema)

module.exports=empModel;