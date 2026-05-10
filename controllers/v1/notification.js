const { isValidObjectId } = require("mongoose");
const NotificationModel=require("../../models/notification")
const UserModel=require("../../models/User")
exports.create=async(req,res)=>{
    const{message,admin}=req.body
    const exsituser=await UserModel.findOne({_id:admin});
    if(!(isValidObjectId(admin))){
        return res.json({message:"Admin id is not valid"})
    }
    if(!exsituser){
        return res.status(404).json({message:"Admin Not Found"})
    }
    const notification=await NotificationModel.create({
        message,
        admin
    })

    return res.status(201).json({notification})
}

exports.get=async(req,res)=>{
    const {_id}=req.user

    const notifications=await NotificationModel.find({admin:_id}).lean();

    return res.json({notifications})
}

exports.seen=async(req,res)=>{
    const {id}=req.params

    const seenotification=await NotificationModel.findOneAndUpdate({_id:id},{seen:1})

    return res.json({seenotification})
}
