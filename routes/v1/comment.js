const express=require("express")
const Controller=require("../../controllers/v1/comment")
const authMiddleware=require("../../middlewares/auth")
const isAdminMiddleware=require("../../middlewares/isAdmin")
const router=express.Router();

router.route("/").post(authMiddleware,Controller.create)
router.route("/:id").delete(authMiddleware,isAdminMiddleware,Controller.remove)
router.route("/:id/accept").put(authMiddleware,isAdminMiddleware,Controller.accept)


router.route("/:id/reject").put(authMiddleware,isAdminMiddleware,Controller.reject)


module.exports=router