const express= require("express");
const router=express.Router();

router.get("/",function(req,res){
    res.send("hii form products route");
});

module.exports=router;