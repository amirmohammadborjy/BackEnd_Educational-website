const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    }
},{timestamps})

const model=mongoose.model("NewsLetter",schema)

module.exports=model





