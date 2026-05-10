const express=require("express")
const Controller=require("../../controllers/v1/search")
const router=express.Router();

router.route("/:keyword").get(Controller.search)

module.exports=router