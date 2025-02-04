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

router.get("/shop", isLoggedIn, async function (req, res) {
    try {
        const { sort, category, availability, discount } = req.query;

        // Define filter conditions
        let filterConditions = {};

        // Apply category filter
        if (category && category !== 'all-products') {
            filterConditions.category = category;  // Filtering based on category
        }

        // Apply availability filter (in-stock)
        if (availability === 'in-stock') {
            filterConditions.stock = { $gt: 0 };  // Only show products with stock > 0
        }

        // Apply discount filter (filter products that have a discount)
        if (discount === 'true') {
            filterConditions.discount = { $gt: 0 };  // Filter for products that have a discount
        }

        // Define sorting condition
        let sortCondition = {};
        if (sort === 'newest') {
            sortCondition = { createdAt: -1 };  // Assuming 'createdAt' is a field for when the product was added
        } else if (sort === 'popular') {
            sortCondition = { popularity: -1 };  // Assuming 'popularity' is a field for sorting popular products
        }

        // Fetch the filtered and sorted products
        let products = await productModel.find(filterConditions).sort(sortCondition);

        // Success message
        let success = req.flash("success");

        // Render the products on the shop page
        res.render("shop", { products, success });
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

router.get("/cart", isLoggedIn,async function (req, res) {
    let user=await userModel.findOne({ email : req.user.email}).populate("cart");

    res.render("cart" ,{user});
});

router.get("/cart/remove/:productid", isLoggedIn, async function (req, res) {
    try {
        // Get the logged-in user using the email stored in the session or JWT token
        let user = await userModel.findOne({ email: req.user.email });

        // Find the product ID to remove from the cart
        let productId = req.params.productid;

        // Assuming the user's cart is an array of objects that contain product IDs
        let cart = user.cart;

        // Find the product in the cart to remove
        let productIndex = cart.findIndex(item => item._id.toString() === productId);

        if (productIndex !== -1) {
            // Remove the item from the cart array
            cart.splice(productIndex, 1);
            
            // Recalculate total price and item count
            let totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            let totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);  // Fix: define totalItems
            
            // Update the user's cart in the database
            user.cart = cart;
            user.cartTotalPrice = totalPrice; // Assuming you want to store total price
            user.cartTotalItems = totalItems; // Store total items count
            await user.save();
            res.redirect("/cart");

            // Optionally, you can send the updated cart data to the front-end
            // res.render("cart", {
            //     cart: user.cart,
            //     totalPrice: totalPrice,
            //     totalItems: totalItems
            // });
        } else {
            // If the item is not found, handle the error
            res.status(404).send("Product not found in cart");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/profile", isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render("profile", { user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});






 


module.exports = router;
