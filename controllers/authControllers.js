const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken}=require("../utils/generateToken");

module.exports.registerUser= async function (req, res) {

    try {
        let { fullname, email, password } = req.body;

        let user= await userModel.findOne({email:email});
        if (user) return res.status(401).send("You already Hvae an account, please login");           // check account if have then show msg otherwise create account 
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);                     // created hash 
                else {
                    let user = await userModel.create({
                        fullname,
                        email,                                           // if user not create then create user
                        password: hash,
                    })
                    let token=generateToken(user);         // function call - generate token
                 res.cookie("token",token);              // token are send in ragisterd users browser (cookie set )
                 res.send("User created omya...")           
                }
            });
        });


    } catch (err) {
        res.send(err.message);
    }

}

module.exports.loginUser= async function (req, res) {
    let {email,password}=req.body;
    let user = await userModel.findOne({email:email});
    if (!user){ 
        return res.send("Email or Password incorrect");  // if user not registerd
    }
     
    bcrypt.compare(password,user.password,function(err,result){
        if (result){
            let token =generateToken(user);
            res.cookie("token", token); 
            res.send("You can login")         
        }else{
            return res.send("Email or Password Incorrect");
        }
    });

}