const mongoose=require('mongoose');

const User=mongoose.model('User',{
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        enum:['User','Admin','Vip']
    },
    avatar:{
        type:String,
        required:true
    }
})

module.exports=User;