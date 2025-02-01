const express = require("express");
const userModel = require("../models/user-model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const config =require("config")
const {generateToken}=require("../utils/generateToken");
const {registerUser}=require("../controllers/authControllers");
const {loginUser}=require("../controllers/authControllers");

router.get("/", function (req, res) {
    res.send("hiiform users route");
});

router.post("/register", registerUser );   //registerUser is function is define in authcontroller 
router.post("/login", loginUser); 

module.exports=router;
