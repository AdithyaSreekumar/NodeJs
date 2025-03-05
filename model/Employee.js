const mongoose = require('mongoose');
const userModel = require('./userdata');
const employeeSchema = new mongoose.Schema({
    // employeeId:{type:String,required:true,unique:true},
    quali:{type:String,required:true},
    salary:{type:String,required:true},
    empID :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'userModel'
    },
    name :{
        type: mongoose.Schema.Types.String,
        ref : 'userModel'
    }
})

const empModel = mongoose.model("empModel",employeeSchema)

module.exports=empModel;