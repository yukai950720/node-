const mongoose=require("mongoose");
const Schma=mongoose.Schema;

 var userSchma=new Schma({

    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    avater: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }


 })

 module.exports=User=mongoose.model('users',userSchma);