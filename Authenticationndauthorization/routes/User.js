const { Router } = require("express")
const router=Router();

const{userHandler}=require("../controllers/userController")
router.post("/createUser",userHandler)
const{loginController}=require("../controllers/login")
router.post("/login",loginController)

const{auth,isStudent,isAdmin}=require("../middlewares/auth")

//protected route for student authorization....
router.get("/test",auth,((req,res)=>{
    res.status(200).json({
        succes:true,
        message:"Welcome to the protected route of test panel"
    })
    
}))
router.get("/student",auth,isStudent,((req,res)=>{
    res.status(200).json({
        succes:true,
        message:"Welcome to the protected route of student panel"
    })
    
}))
router.get("/admin",auth,isAdmin,((req,res)=>{
    res.status(200).json({
        succes:true,
        message:"Welcome to the protected route of Admin panel"
    })
}))
module.exports=router;