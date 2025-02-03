const jwt =require("jsonwebtoken");
const userModel = require("../models/user-model");


module.exports = async function (req, res, next) {
    // Check if token is present in cookies
    if (!req.cookies.token) {
        req.flash('error', 'You have to log in first.');
        return res.redirect('/');  // Redirect to login if token is not found
    }
    
    try {
        // Verify the JWT token using the secret key
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        
        // Find user based on decoded email and exclude password
        let user = await userModel.findOne({ email: decoded.email }).select("-password");
        
        if (!user) {
            req.flash('error', 'User not found.');
            return res.redirect('/');  // Redirect if no user found
        }

        // Attach user data to the request object
        req.user = user;

        // Proceed to the next middleware
        next();   
    } catch (err) {
        // Handle token errors or any other issues
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/');  // Redirect to login page if an error occurs
    }
};
