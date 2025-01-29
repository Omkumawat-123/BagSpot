const express= require("express");
const router=express.Router();

router.get("/",function(req,res){
    res.send("hiiform users route");
});

module.exports=router;