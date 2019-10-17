const express=require("express");
const app=express();
const mongoose=require("mongoose")

const bodyParser=require("body-parser");
const passport=require("passport");


//配置bodyParser
const jsonParser=bodyParser.json();
const urlencodeParser=bodyParser.urlencoded({extended:false});

//配置passport 验证token
app.use(passport.initialize());
require("./config/passport")(passport);

mongoose.connect("mongodb://root:root@127.0.0.1:27017/demo?authSource=admin")
.then(res=>{
    console.log("数据库连接成功")
}).catch(err=>{
    console.log(err);
})

//引用router
var user=require("./api/user");
app.use('/user',user);
var profile=require("./api/profile");
app.use('/profile',profile);



//使用中间件实现允许跨域
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPPTIONS");
    next();

})

app.post("/test",(req,res)=>{
    res.json({msg:"测试成功"})
})

const port=process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})