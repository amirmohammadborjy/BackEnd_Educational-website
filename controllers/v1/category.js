const { isValidObjectId } = require("mongoose")
const CategoryModel=require("../../models/category")
const Validation=require("../../validators/category")

exports.create=async(req,res)=>{
    try {
    const {title,link}=req.body
    const isvalid= Validation(req.body)
    if(!isvalid){
        return res.json("data not valid")
    }
    const category=await CategoryModel.create({
        title,
        link
    })
    return res.status(201).json(category)

    } catch (error) {
        return res.json(error)
    }
    
}
exports.remove=async(req,res)=>{
  const isvalidid=isValidObjectId(req.params.id)    
    if(!isvalidid){
        return res.json({
            message:"Category ID is not Valid"
        })
    }
    const result=await CategoryModel.findByIdAndDelete({_id:req.params.id})
     if(!result){
        return res.json("category not found")
     }   
    return res.json("Category deleted Successfuly")



    
}
exports.update=async(req,res)=>{
    try {
        const {title,link}=req.body
        const isvalidid=isValidObjectId(req.params.id)    
    if(!isvalidid){
        return res.json({
            message:"Category ID is not Valid"
        })
    }
    const isvalid= Validation(req.body)
    if(!isvalid){
        return res.json("data not valid")
    }
    const category=await CategoryModel.findByIdAndUpdate({_id:req.params.id},
        {
            title,
            link
        })

    return res.json(category)  
    } catch (error) {
        return res.json(error)
    }
      
}
exports.getall=async(req,res)=>{
  try {
        const categorys=await CategoryModel.find().lean;
        return res.json(categorys)    
    } catch (error) {
        return res.json(error)
    }
}



