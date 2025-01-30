const mongoose=require("mongoose");
const config =require("config");
const dbgr = require("debug")("Development:mongoose");    // debug its an replacment for console log we can manage condsole.Logs only appear when = $env:DEBUG = "Development:*" & diappear= $env:DEBUG = ""  
mongoose
.connect(`${config.get("MONGODB_URI")}/BagSpot`)
.then(function(){
    dbgr("Connected");    // after a connection
})
.catch(function(err){
    dbgr(err);          // err print 
})
module.exports=mongoose.connection;