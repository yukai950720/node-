const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

var gravatar = require('gravatar');

//使用token
const jwt=require("jsonwebtoken");




const router=express.Router();

//配置bodyParser
var jsonParser=bodyParser.json();
var urlcondeParser=bodyParser.urlencoded({extended:false});

const User=require("./../models/User");


//引用验证validator
var VadUser=require("./../validator/vadUser");

router.post("/register",urlcondeParser,(req,res)=>{
    //res.json({msg:"注册成功"});
    
    User.findOne({email:req.body.email}).then(user=>{

        const {errors,isEmpty}=VadUser(req.body);
    
        if (isEmpty) {
            res.json(errors);
        }

        if (user) {
            res.json({msg:"邮箱已被注册"})
        }

        var avater=gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
        //gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });

        const newUser=new User({
            email:req.body.email,
            name:req.body.name,
            password:req.body.password,
            password2:req.body.password2,
            avater

        })

        newUser.save().then(user=>{
            res.json(user);
        })

    }).catch(err=>{
        console.log(err);
    })

})


/****
 * 登录接口  @api: /login
 * 
 */

 router.post("/login",urlcondeParser,(req,res)=>{
     User.findOne({email:req.body.email}).then(user=>{
            if (!user) {
                res.status(400).json({msg:"您的邮箱未注册"})
            }else{
                if (req.body.password==user.password) {
                    //res.status(200).json(user);

                    const rules={id:user.id,name:user.email};
                    jwt.sign(rules, 'secret', { expiresIn: 60*60}, function(err, token) {
                        res.status(200).json({
                            msg:"登录成功",
                            token:'Bearer '+token
                        })
                    });

                }else{
                    res.status(400).json({msg:"您的密码不正确"})
                }
            }
            //res.json(user);

     })
 })


module.exports=router;