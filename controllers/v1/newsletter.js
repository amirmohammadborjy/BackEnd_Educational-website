const NewsletterModel=require("../../models/newsletter")
const emailValidator=require("../../validators/newsletter")
exports.getall=async(req,res)=>{
    const allemails=await NewsletterModel.find({})
    return res.json({emails:allemails})
}

exports.create=async(req,res)=>{
    const {email}=req.body
    const emailvalid=emailValidator(email)
    if(!emailvalid){
        return res.json({message:"The email is wrong"})
    }
    const isexist=await NewsletterModel.findOne({email})
    if(!isexist){
        return res.json({message:"Email is already registered"})
    }
    const addemail=await NewsletterModel.create({
        email
    })
    return res.json({email,message:"email added successfuly"})
}

