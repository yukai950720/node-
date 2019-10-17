const express=require("express");
const router=express.Router();

const passport=require("passport");

const mongoose=require("mongoose");
const bodyParser=require("body-parser");

const jsonParser=bodyParser.json();
const urlcodeParser=bodyParser.urlencoded({extended:false});
 
router.post("/",passport.authenticate('jwt',{session:false}),urlcodeParser,(req,res)=>{
    res.json({msg:"获取数据成功"})
})





module.exports=router;