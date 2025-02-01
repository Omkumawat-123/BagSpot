const jwt= require("jsonwebtoken");

const generateToken=(user)=>{
    return  token=jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY); 
};                          //generate token and return token

module.exports.generateToken=generateToken;