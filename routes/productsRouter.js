const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async function (req, res) {
    try {
        // Extract other fields from req.body
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        // Check if image is provided and handle the creation of product accordingly
        if (!req.file) {
            return res.status(400).send("No image uploaded.");
        }

        // Create a new product with the uploaded image buffer and other fields
        let product = await productModel.create({
            image: req.file.buffer, // Use the uploaded image buffer
            name, 
            price, 
            discount, 
            bgcolor, 
            panelcolor, 
            textcolor,
        });

        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (err) {
        res.status(500).send(err.message); // Improved error handling
    }
});




module.exports = router;