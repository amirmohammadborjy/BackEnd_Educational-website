const { isValidObjectId } = require("mongoose")
const CourseModel=require("../../models/course")
const SessionModel=require("../../models/session")
const Course_UsersModel=require("../../models/course_users")
const CategoryModel=require("../../models/category")
const CommentModel=require("../../models/comment")
exports.create=async(req,res)=>{
    const {
        
        title,
        description,
        cover,
        price,
        discount,
        support,
        href,
        status,
        catrgortID,
        
        

    }=req.body

    const course=await CourseModel.create({
        title,
        description,
        price,
        discount,
        support,
        href,
        status,
        catrgortID,
        teacher:req.user._id,
        cover:req.file.filename
    })

    const maincourse=await CourseModel.findById(course._id).populate("teacher","-password")

    return res.json(maincourse)

}

exports.sessioncreate=async(req,res)=>{
    try {
        const{title,time,isfree}=req.body
    const {id}=req.params.id
    const isValidID=isValidObjectId(id)
    if(!isValidID){
        return res.json("Course ID is Not Valid")
    }
    const session=await SessionModel.create({
        title,
        time,
        isfree,
        video:req.file.filename,
        course:id
    })

    return res.status(201).json(session)
    } catch (error) {
        return res.json(error)
    }
    
}

exports.getallsession=async(req,res)=>{
    try {
         const sessions=await SessionModel.find({}).populate("Course","name").lean()
         return res.json(sessions)
    } catch (error) {
        return res.json(error)
    }
   
}

exports.register=async(req,res)=>{
    try {
        const isUserAlredyRegister=await Course_UsersModel.findOne({
         course:req.params.id,
        user:req.user._id
    }).lean();
    if(isUserAlredyRegister){
        return res.status(409).json("user alredy registered")
    }


    const register=await Course_UsersModel.create({
        course:req.params.id,
        user:req.user._id,
        price:req.body.price
    }).lean();

    return res.status(201).json("register successfuly")
    } catch (error) {
        
    }
    


}


exports.getbyhref=async(req,res)=>{
    try {
        const{href}=req.params.href
        const category=await CategoryModel.findOne({link:href})
        if(category){
            const courses=await CourseModel.find({catrgortID:category._id})
            return res.json(courses)
        }
         return res.json([])
        

    } catch (error) {
        return res.json(error)       
    }
}


exports.getone=async(req,res)=>{
    try {
         const{href}=req.params

          const course=await CourseModel.findOne(href)
           .populate("teacher","-password")
         .populate("catrgortID")

         const sessions=await SessionModel.find({course:course._id}).lean()

         const comments=await CommentModel.find({course:course._id,isAccept:1})
         .populate("user","-password").lean()

         const coursestudent=await Course_UsersModel.find({course:course._id}).count()

        const allcomment=[]

        comments.forEach(comment => {
            comments.forEach(commentanwser => {
                if(String(comment._id)==String(commentanwser.mainCommentID)){
                       allcomment.push({
                            ...comment,
                            course:comment.course.title,
                            user:comment.user.name,
                            commentanwser
                       })  
                }
            });
        });
            const isUserRegister=!!(await Course_UsersModel.findOne({
                user:req.user._id,
                course:course._id
            }))

         return res.json({
            course,
            sessions,
            comments:allcomment,
            coursestudent,
            isUserRegister
        })

    } catch (error) {
        return res.json(error)
    }
  

}

exports.remove=async(req,res)=>{

    const {id}=req.params.id

    const isValidID=isValidObjectId(id)

    if(!isValidID){
        return res.status(409).json({message:"id is not valid!!!"})
    }
    
    const deletecourse=await CourseModel.findOneAndDelete({_id:id})

    if(!deletecourse){
        return res.status(404).json({message:"course not found !!"})
    }

    return res.json("Course Deleted Successfuly")


}


exports.courserelated=async(req,res)=>{

    const {href}=req.params.href

    const course=await CourseModel.findOne({href}).lean()

    if(!course){
        return res.status(404).json({message:"course not found !!"})
    }

    let courses=await CourseModel.find({catrgortID:course.catrgortID}).lean()

    courses=courses.filter(itemcourse=>itemcourse.href!=href)

    return res.json(courses)
}