const express=require("express")
const cors = require('cors');
const app=express()
app.use(cors());
require("dotenv").config();
const PORT=process.env.PORT;

app.use(express.json());
const router=require("./routes/User")
app.use("/api/v1",router);

const dbconnect = require("./config/database");
dbconnect();

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send(`<h1>Hey Everyone </h1>`)
})