const Usermodel=require("../../models/User");
const BanUser=require("../../models/Ban_Phone");
const { isValidObjectId } = require("mongoose");
const bcrypt=require("bcrypt")
const Validation=require("../../validators/register")
exports.BanUser=(async(req,res)=>{
    try {
        const isvalid=isValidObjectId(req.params.id);
        if(!isvalid){
            return res.status(409).json({
                message:"User ID is not valid"
            })
        }
    const user=await Usermodel.findOne({_id:req.params.id}).lean();
     console.log(user);
    
    if(!user){
        return res.status(404).json("user not find !!")
    }
    const isExist=await BanUser.findOne({phonenumber:user.phonenumber}).lean();
    console.log(isExist);
    
    if(isExist){
        return res.status(406).json("user already ban !")
    }
    const banuser=await BanUser.create({
        phonenumber:user.phonenumber
    })
    if(banuser){
        return res.status(201).json("user baned successfuly")
    }

    return res.status(500).json("Server Error !!!");
    } catch (error) {
        return res.json("user is wrong !!!!!!!")
    }
    
})

exports.getall=async(req,res)=>{
    try {
        const users=await Usermodel.find()
        return res.json(users)
        
    } catch (error) {
        return res.json(error)
    }
}

exports.deleteuser=async(req,res)=>{
    try {
       const isvalid=isValidObjectId(req.params.id)
       if(!isvalid){
        return res.status(409).json({message:"user id is not valid"})
       }
        const result=await Usermodel.findByIdAndDelete({_id:req.params.id}).lean();
        if(!result){
            return res.status(404).json({
                message:"user not find"
            })
        }
        return res.status(200).json({
            message:"user deleted successfuly"
        })
    } catch (error) {
        return res.json(error)
    }
    
}

exports.userupdate=async(req,res)=>{
    try {
        const {name,username,password,phonenumber,email}=req.body
    const isvalid= Validation(req.body)
    if(!isvalid){
        return res.status(422).json(isvalid)
    }
    const hashedpassword=await bcrypt.hash(password,10)
    const user=await Usermodel.findByIdAndUpdate({_id:req.user._id},{
        name,
        username,
        password:hashedpassword,
        email,
        phonenumber

    }).select("-password").lean()

    return res.json(user)
    } catch (error) {
        return  res.json(user)
    }
    

}