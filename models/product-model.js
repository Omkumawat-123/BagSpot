const mongoose =require("mongoose");

const productSchema = mongoose.Schema({
  image: Buffer,
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
  category: {
    type: String, // Categories such as 'New Collection', 'Discounted Products', etc.
    required: true
  },
  stock: {
    type: Number, // Number of products available in stock
    default: 0
  }
});
const productModel = mongoose.model("product", productSchema);
module.exports = productModel; 

