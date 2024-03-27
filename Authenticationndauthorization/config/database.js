const mongoose=require("mongoose")
require("dotenv").config()
const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{console.log("Connection established...");})
    .catch((error)=>{console.log("Connection failed..."); 
    process.exit(1)})
}
module.exports=dbconnect