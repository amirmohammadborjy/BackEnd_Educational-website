const exporess=require("express")
const Contoller=require("../../controllers/v1/newsletter")
const authMiddleware=require("../../middlewares/auth")
const isAdminMiddleware=require("../../middlewares/isAdmin")
const router=exporess.Router();

router.route("/")
.get(authMiddleware,isAdminMiddleware,Contoller.getall)
.post(Contoller.create)


module.exports=router