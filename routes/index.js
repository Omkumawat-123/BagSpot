const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel= require("../models/product-model"); // Import the product model

router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error: "" });
});

router.get("/shop",isLoggedIn, async function (req, res) {
    try {
            
        const products = await productModel.find()

        // Pass products to the shop page
        res.render("shop", { products });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
