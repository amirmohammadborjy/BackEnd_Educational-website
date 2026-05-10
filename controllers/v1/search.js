const CourseModel=require("../../models/course")

exports.search=async(req,res)=>{
    const {keyword}=req.params

    const courses=await CourseModel.find({
        title:{$regex:".*"+keyword+".*"}
    })

    return res.json({courses})
}