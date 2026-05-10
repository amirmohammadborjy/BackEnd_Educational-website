const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    percent:{
        type:Number,
        required:true
    },
    course:{
        type:mongoose.Types.ObjectId,
        ref:"Course",
        required:true
    },
    max:{
        type:Number,
        required:true
    },
    useage:{
        type:Number,
        default:0
    },
    creator:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
})


const model=mongoose.model("Discount",schema)

module.exports=model