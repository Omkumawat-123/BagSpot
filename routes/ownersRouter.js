const express= require("express");
const router=express.Router();

router.get("/",function(req,res){
    res.send("hii form owners route ");
});

module.exports=router;