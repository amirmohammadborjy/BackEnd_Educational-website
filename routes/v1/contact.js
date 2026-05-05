const express=require("express")
const Controller=require("../../controllers/v1/contact")
const authMiddleware=require("../../middlewares/auth")
const isAdminMiddleware=require("../../middlewares/isAdmin")
const router=express.Router();

router.route("/")
.get(authMiddleware,isAdminMiddleware,Controller.getall)
.post(Controller.create)


router.route("/:id").delete(authMiddleware,isAdminMiddleware,Controller.remove)

module.exports=router