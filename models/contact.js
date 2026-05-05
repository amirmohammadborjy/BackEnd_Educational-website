const mongoose=require("mongoose")

const Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    answer:{
        type:Number,
        required:true
    },
    body:{
        type:String,
        required:true
    },
})


const model=mongoose.model("Contact",Schema);
module.exports=model