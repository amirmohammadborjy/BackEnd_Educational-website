const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    phonenumber:{
        type:String,
        required:true
    },
   

},{timestamps:true})

const model=mongoose.model("BanUser",schema)

module.exports=model