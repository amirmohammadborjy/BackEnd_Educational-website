const express=require("express")
const authMiddleware=require("../../middlewares/auth")
const isAdminMiddleware=require("../../middlewares/isAdmin")
const Controller=require("../../controllers/v1/discount")
const router=express.Router();


router.route("/")
.get(authMiddleware,isAdminMiddleware,Controller.getall)
.post(authMiddleware,isAdminMiddleware,Controller.create)

router.route("/all").get(authMiddleware,Controller.setonall)

router.route("/:code").get(authMiddleware,Controller.getone)
router.route("/:id").get(authMiddleware,Controller.remove)


module.exports=router