const express =require("express");
const app=express();
require('./server');
const cors=require("cors")    
const path=require("path")  
const bodyParser=require("body-parser")
const authRouter=require("./routes/v1/auth")  
const userRouter=require("./routes/v1/user")  
const categoryRouter=require("./routes/v1/category")
const commentRouter=require("./routes/v1/comment")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use("/courses/covers",express.static(path.join(__dirname,'public','courses','covers')))
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/comment",commentRouter)
app.use("/api/v1/user",userRouter)
module.exports=app