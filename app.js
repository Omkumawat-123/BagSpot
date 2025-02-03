const express=require ("express");
const app=express();
const cookieParser = require("cookie-parser");
const path = require("path");
const flash=require("connect-flash");
const session = require("express-session");

const db=require("./config/mongoose-connection")
const ownersRouter =require("./routes/ownersRouter");
const usersRouter =require("./routes/usersRouter");
const productsRouter =require("./routes/productsRouter");
const index=require("./routes/index");
const multer=require("multer");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,  // Ensure this is set in your .env file
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use("/", index)
app.use("/owners", ownersRouter);   // owners releted rountes => routes/ownersRouter file madhe share zalet 
app.use("/users", usersRouter);
app.use("/products", productsRouter );

app.listen(3000);