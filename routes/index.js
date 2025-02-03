const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel= require("../models/product-model"); 
const userModel= require("../models/user-model");

router.get("/", function (req, res) {
    let error = req.flash("error");
    let success=req.flash("success")
    res.render("index", { error, loggedIn:false });
});

router.get("/shop",isLoggedIn, async function (req, res) {
    try {    
        let products = await productModel.find()
        let success=req.flash("success")
        // Pass products to the shop page
        res.render("shop", { products,success });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

router.get("/AddToCart/:productid", isLoggedIn, async function (req, res) {
    try {    
        let user = await userModel.findOne({ email: req.user.email }); // user find

        let productId = req.params.productid.replace(":", ""); // Remove extra colon if present
        
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            req.flash("error", "Invalid product ID");
            return res.redirect("/shop");
        }// id is invalid

        user.cart.push(new mongoose.Types.ObjectId(productId)); // Convert to ObjectId
        await user.save();

        req.flash("success", "Added to cart");
        res.redirect("/shop");
    } catch (error) {
        console.log(error);
        req.flash("error", "Something went wrong");
        res.redirect("/shop");
    }
});

router.get("/cart", function (req, res) {
    let success=req.flash("success")
    res.render("cart");
});


 


module.exports = router;
