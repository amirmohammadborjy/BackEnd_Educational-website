const express=require("express")
const multer=require("multer")
const multerStorage=require("../../utils/uploader")
const controller=require("../../controllers/v1/course")
const authMiddleware=require("../../middlewares/auth")
const isAdminMiddleware=require("../../middlewares/isAdmin")

const router=express.Router();

router.route("/").post(multer({storage:multerStorage,limits:{fieldSize:10000000}})
.single("cover"),
authMiddleware,
isAdminMiddleware
,controller.create)

router.route("/:id/session").post(multer({storage:multerStorage,limits:{fieldSize:1000000}}).single("video"),controller.sessioncreate)



router.route("/id").delete(authMiddleware,isAdminMiddleware,controller.remove)

router.route("/:id/register").post(authMiddleware,controller.register)

router.route("/category/:href").get(controller.getbyhref)

router.route("/:href").get(authMiddleware,controller.getone)




module.exports=router