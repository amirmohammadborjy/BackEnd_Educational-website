const jwt=require("jsonwebtoken");
const UserModel=require("../models/User")

module.exports=async(req,res,next)=>{
    
    const reqtoken=req.headre("Authorization")?.split(" ");
    if(reqtoken?.length!=2){
        return res.status(403).json({
            message:"you dont have access "
        })
    }

    const token=reqtoken[1];
    try {
        const jwtpayload=jwt.verify(token,process.env.JWT_TOKEN)
        const user=await UserModel.findById(jwtpayload.id).lean();
        Reflect.deleteProperty(user,"password");
        req.user=user;
        return next();
        
    } catch (error) {
       return res.json(error)
    }
}
