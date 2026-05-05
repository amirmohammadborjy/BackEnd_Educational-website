const express=require("express")
const controller=require("../../controllers/v1/category")
const isAdminMiddleware=require("../../middlewares/isAdmin")
const authMiddleware=require("../../middlewares/auth")

const router=express.Router();

router.route("/")
.post(authMiddleware,isAdminMiddleware,controller.create)
.get(controller.getall)

router.route("/:id")
.delete(authMiddleware,isAdminMiddleware,controller.remove)
.put(authMiddleware,isAdminMiddleware,controller.update)

module.exports=router