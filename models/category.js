const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
})

const model=mongoose.model("Category",schema)

module.exports=model