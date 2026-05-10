const exporess=require("express")
const Contoller=require("../../controllers/v1/notification")
const authMiddleware=require("../../middlewares/auth")
const isAdminMiddleware=require("../../middlewares/isAdmin")
const router=exporess.Router();

router.route("/")
.post(authMiddleware,isAdminMiddleware,Contoller.create)

router.route("/getadmin")
.get(authMiddleware,isAdminMiddleware,Contoller.get)

router.route("/:id/see")
.get(authMiddleware,isAdminMiddleware,Contoller.seen)

module.exports=router