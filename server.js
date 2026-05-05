const app =require("./app");
const mongoose=require("mongoose")
require("dotenv").config();
console.log(process.env.PORT);
(async()=>{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Data base Conected");
    
})()
app.listen(process.env.PORT,()=>{
    console.log(`server run on port${process.env.PORT}`);
    
})
