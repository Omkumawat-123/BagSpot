const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");


router.get("/", function (req, res) {
    res.send("hii form owners route ");
});

//console.log(process.env.NODE_ENV);                       check the env like dev/production 

if (process.env.NODE_ENV === "development") {

    router.post("/create", async function (req, res) {
        let owners = await ownerModel.find();           // find the owner
        if (owners.length > 0) {                               // check if owner present or not
            return res
                .send(501)                                                    
                .send("you don't have permission to create a new owner")   // if already created
        }
        let {fullname,email,password}= req.body;
        let createdOwner=await ownerModel.create({
            fullname,                                  
            email,
            password,                                            // owner created(1)
        })
        res.status(201).send(createdOwner)
        
    });

}

module.exports = router;