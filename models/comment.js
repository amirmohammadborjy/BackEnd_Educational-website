const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        default:5
    },
    course:{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    isAccept:{
        type:Number,
        default:0
    },
    isAwnser:{
        type:Number,
        required:true
    },
    mainCommentID:{
        type:mongoose.Types.ObjectId,
        ref:"Comment"
    },
    
},{timestamps:true})

const model=mongoose.model("Comment",schema);

module.exports=model