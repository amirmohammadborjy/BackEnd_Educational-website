const Usermodel=require("../../models/User")
const BanUser=require("../../models/Ban_Phone")
const Validation=require("../../validators/register")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config();
exports.register=(async(req,res)=>{
    
    const {name,username,password,email,phonenumber}=req.body
    const isvalid= Validation(req.body)
    if(!isvalid){
        return res.status(422).json(isvalid)
    }

    const isExist=await Usermodel.findOne({
        $or:[{email},{username}]
    });
    
    if(isExist){
        return res.status(409).json({message:"username or email is alredy Exist"})
    }
    const countOfUser=await Usermodel.countDocuments();
    const hashed=await bcrypt.hash(password,10)
    
    const user=await Usermodel.create({
        name,
        username,
        email,
        phonenumber,
        password:hashed,
        role:countOfUser>0?"USER":"ADMIN"
    })
    const userobject=user.toObject();
    Reflect.deleteProperty(userobject,"password")
    const token=jwt.sign({id:user._id},process.env.JWT_TOKEN,{
        expiresIn:"30 day"
    });
    return res.status(201).json({user:userobject,token})



})

exports.login=(async(req,res)=>{
     const {email,password}=req.body
     const user=await Usermodel.findOne({email}).lean
     const isban=await BanUser.findOne({phonenumber:user.phonenumber})
     if(isban){
        return res.status(403).json("Your phonenumber has been blocked !!!")
     }
     const isPasswordvalid=await bcrypt.compare(password,user.password)
     if(!isPasswordvalid){
        return res.status(401).json({
                message:"Password isnot valid"
        });
     }
     
      const accesstoken=jwt.sign({id:user._id},process.env.JWT_TOKEN,{
        expiresIn:"30 day",
      })

      res.json({
        token:accesstoken
      })
})

exports.getme=(async(req,res)=>{

})





     