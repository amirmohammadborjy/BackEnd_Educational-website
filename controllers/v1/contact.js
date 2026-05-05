
const { isValidObjectId } = require("mongoose");
const ContactModel=require("../../models/contact")
const nodemailer=require("nodemailer")
exports.getall=async(req,res)=>{
    const contacts=await ContactModel.find({});
    return res.json({data:contacts}) 
}

exports.create=async(req,res)=>{
    const {name,email,phone,body}=req.body
    const contact=await ContactModel.create({
        name,
        email,
        phone,
        body,
        answer:0
    })

    return res.json({contact})
}

exports.remove=async(req,res)=>{
    const{id}=req.params.id
    const isValidid=isValidObjectId(id)
    if(!isValidid){
        return res.json("Contact ID is not Valid")
    }

    const contact=await ContactModel.findOneAndDelete({_id:id})
    if(!contact){
        return res.status(404).json({message:"Contact not found"})
    }
    return res.json({contact,message:"contact deleted successfuly"})
    

}

exports.answer=async(req,res)=>{
    const {body,email}=req.body
    const transport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"your email",
            pass:"app password"
        }
    })

    const mailoption={
        from:"your email",
        to:email,
        subject:"title email",
        text:body
    }

    transport.sendMail(mailoption,async(error,info)=>{
        if(error){
            return res.json("error")
        }
        const contact=await ContactModel.findByIdAndUpdate({email},{answer:1})
        return res.json("successfuly")
    })
}