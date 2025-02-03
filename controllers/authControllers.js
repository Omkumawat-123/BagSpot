const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken}=require("../utils/generateToken");
const flash=require("connect-flash");

module.exports.registerUser= async function (req, res) {

    try {
        let { fullname, email, password } = req.body;

        let user= await userModel.findOne({email:email});
        // 1️⃣ Check if user already exists
        if (user) {
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/"); // Redirect back to registration page
        }         
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);                   // 2️⃣ Generate hash for password
                else {
                    let user = await userModel.create({
                        fullname,
                        email,                                             // 3️⃣ Create new user
                        password: hash,
                    })
                    let token=generateToken(user);        // 4️⃣ Generate token - funcation ccall 
                 res.cookie("token",token);              // 5️⃣ Send token as cookie ragisterd users browser (cookie set )
                 req.flash("success", "User Created")          
                }
            });
        });


    } catch (err) {
        res.send(err.message);
    }

}

module.exports.loginUser= async function (req, res) {
    let {email,password}=req.body;
    // 1️⃣ Check if user already exists
    let user = await userModel.findOne({email:email});
    if (!user){ 
        req.flash("error", "Email or Password Incorrect"); // Flash message for incorrect password
        return res.redirect("/");   // if user not registerd
    }
     
    bcrypt.compare(password,user.password,function(err,result){   //cmpare pass with hash
        if (result){
            req.flash("success", "Login Suceesfully");
            let token =generateToken(user);//  Generate token - funcation ccall 
            res.cookie("token", token); //set cookie 
            res.redirect("/shop");         
        }else{
            return res.send("Email or Password Incorrect");     
        }
    });

} 

module.exports.logout= function (req,res){
    res.cookie("token", "")
    res.redirect("/") 
}
