const express=require("express");
const controller=require("../../controllers/v1/user")
const authMiddleware=require("../../middlewares/auth")
const isAdminMiddleware=require("../../middlewares/isAdmin")
const router=express.Router();

router.route("/users").get(authMiddleware,isAdminMiddleware,controller.getall)

router.route("/banuser/:id").post(authMiddleware,isAdminMiddleware,controller.BanUser)

router.route("/deleteuser/:id").delete(authMiddleware,isAdminMiddleware,controller.deleteuser)

module.exports=router