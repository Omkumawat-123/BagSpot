const mongoose=require("mongoose");
mongoose
.connect("mongodb://127.0.0.1:27017/BagSpot")
.then(function(){
    console.log("Connected")    // after a connection
})
.catch(function(err){
    console.log(err);          // err print 
})
module.exports =mongoose.connection;