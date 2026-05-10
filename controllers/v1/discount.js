const DiscountModel=require("../../models/discount")
const CourseModel=require("../../models/course")
exports.getall=async(req,res)=>{
const discounts=await DiscountModel.find({},"-__v")
.populate("course","title href")
.populate("creator","name ")
.lean();
 
    return res.json({discounts})
}

exports.create=async(req,res)=>{
    const {id}=req.user._id
     const {code,percent,course,max,useage,creator}=req.body
     const isexsit=await DiscountModel.findOne({code})
     if(isexsit){
        return res.json({message:"code alredy exsist"})
     }
     const newdiscount=await DiscountModel.create({
        code,
        percent,
        course,
        max,        
        creator:id,
     })

     return res.json({newdiscount})
}

exports.setonall=async(req,res)=>{
    const {discount}=req.body

    try {
        const coursesdiscount=await CourseModel.updateMany({discount}).lean()
        return res.json({message:"off set on all courses successfuly"})
    } catch (error) {
        return res.json(error)
    }

    
}

exports.getone=async(req,res)=>{
    const {code}=req.params
    const {course}=req.body
try {
    const discount=await DiscountModel.findOne({code,course})
    if(!discount){
        return res.status(404).json({message:"discount code not found"})
    }
    else if(discount.max==discount.useage){
        return res.json({message:"discount code expired"})
    }
    else{
        await DiscountModel.findOneAndUpdate({code,course},{useage:discount.useage+1})
        return res.json({discount})
    }

    
    
} catch (error) {
    return res.json(error)
}   
    
}   

exports.remove=async(req,res)=>{
    const {id}=req.params

    const discountdeleted=await DiscountModel.findOneAndDelete({_id:id})
    if(!discountdeleted){
        return res.status(404).json({message:"discount code not found"})
    }
    return res.json({discountdeleted,message:"discount code deleted successfuly"})
}




