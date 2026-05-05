const { isValidObjectId } = require("mongoose")
const CommentModel=require("../../models/comment")
const CourseModel=require("../../models/course")
exports.create=async(req,res)=>{
    try {
         const {body,rate,coursehref}=req.body

    const course=await CourseModel.findOne({href:coursehref}).lean

    const comment=await CommentModel.create({
        body,
        rate,
        course:course._id,
        user:req.body._id,
        isAccept:0,
        isAwnser:0,

    })

    return res.status(201).json(comment)
    } catch (error) {
        return res.json(error)
    }
   
}

exports.remove=async(req,res)=>{
    const {id}=req.params.id
    const idValid=isValidObjectId(id)
    if(!idValid){
        return res.json("Comment id is not Valid")
    }
    const deleted=await CommentModel.findByIdAndDelete({_id:id}).lean()

    if(!deleted){
        return res.status(404).json("Comment not found!")
    }

    return res.json("Comment Deleted Successfully")
}

exports.accept=async(req,res)=>{

    const {id}=req.params.id
    const idValid=isValidObjectId(id)
    if(!idValid){
        return res.json("Comment id is not Valid")
    }
    const accepted=await CommentModel.findOneAndUpdate({_id:id},{isAccept:1})
    if(!accepted){
        return res.status(404).json("Comment not found!")
    }
    return res.json({message:"Comment accepted successfully"})

}

exports.reject=async(req,res)=>{
    const {id}=req.params.id
    const idValid=isValidObjectId(id)
    if(!idValid){
        return res.json("Comment ID is not Valid")
    }
    const rejected=await CommentModel.findOneAndUpdate({_id:id},{isAccept:0})
    if(!rejected){
        return res.status(404).json("Comment not found!")
    }
    return res.json({message:"Comment rejected successfully"})
}


exports.awnser=async(req,res)=>{
    const {id}=req.params.id
    const {body}=req.body
    const idValid=isValidObjectId(id)
    if(!idValid){
        return res.json("Comment id is not Valid")
    }
    const maincomment=await CommentModel.findOneAndUpdate({_id:id},{isAccept:1})
    if(!maincomment){
        return res.status(404).json("Maincomment not found!")
    }
    const awnsercomment=await CommentModel.create({
        body,
        course:maincomment.course,
        user:req.body._id,
        isAccept:1,
        isAwnser:1,
        mainCommentID:id
    })

    return res.status(201).json(awnsercomment)
    
}
