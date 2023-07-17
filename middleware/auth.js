const User=require('../model/user_model');
const jwt=require('jsonwebtoken');
//login verify
module.exports.verifyLogin=function(req,res,next){
    const token=req.headers.authorization;//token get token123
    const token_split=token.split(' ')[1];//token split for verify
    var decoded = jwt.verify(token_split, 'secretkey');//secretkey check true

    User.findOne({_id:decoded.userid}).then(function(response){    
        req.UserInfo=response;//store user 
        next();//code stop and return back
    })
    .catch(function(error){
        res.status(500).json({message:error.message})
    })
}

//admin authentication

module.exports.verifyAdmin=function(req,res,next){
    if(!req.UserInfo){
        return res.status(401).json({message:"user not found"})
    }else if(req.UserInfo.userType !=="Admin" ){
        return res.status(401).json({message:"user is not admin"})
    }
    next();
}


module.exports.verifyUser=function(req,res,next){
    if(!req.UserInfo){
        return res.status(401).json({message:"user not found"})
    }else if(req.UserInfo.userType !=="User" || req.userInfo.userType !=="Vip" ){
        return res.status(401).json({message:"user is not admin"})
    }
    next();
}
