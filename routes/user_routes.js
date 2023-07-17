const User=require('../model/user_model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const auth=require('../middleware/auth');
const express=require('express');
const router=express.Router();//router feature taken from express//
const upload=require('../middleware/upload');

//CREATE

router.post("/register", upload.single('avatar'),function (req, res) {
    //req data
    const username1 = req.body.username;
    const email1 = req.body.email;
    const password1 = req.body.password;
    const userType1 = req.body.userType;
    const avatar=req.file.filename;
    if (!username1 || !email1 || !password1 || !userType1) {
      return res.status(422).json({ message: "empty data" });
    }
  
    //console check
    console.log("data console check", req.body);
  
    //password bcrypt
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password1, salt, function (err, hash) {
        // Store hash in your password DB.
        //converting object
        const user = new User({
          username: username1,
          email: email1,
          password: hash,
          userType: userType1,
          avatar:avatar
        });
  
        user.save();
        //data save
        //response
        res.status(200).json({ message: "successful" });
      });
    });
});  
router.post('/login',function(req,res){
    const email1=req.body.email;
    const password1=req.body.password;
    //database email check

    //result store all user data
    User.findOne({email:email1}).then(function(result){
        if(result===null){
            return res.status(401).json({message:"email not matched"});
        }

        //hash password compared with passworddatabase
        bcrypt.compare(password1, result.password , function(err, result2) {
            // res === true
            if(result2===false){
                return res.status(401).json({message:"password doesnt matched"})
            }
            var token2=jwt.sign({userid:result._id},'secretkey');//token create secretkey123
            res.status(200).json({message:"login successful",token:token2,userType:result.userType});

        });
        
    })
    .catch(function(error){
        res.status(500).json({message:error.message})
    })
})

//Read

//guard authentication
router.get('/userall',auth.verifyLogin,auth.verifyAdmin,function(req,res){
    User.find().then(function(data){
        res.status(200).json(data);
    })
    .catch(function(error){
        res.status(500).json({message:error.message});
    })
})

router.get('/usersingle/:id',function(req,res){
    const id=req.params.id;
    User.findOne({_id:id}).then(function(data){
        res.status(200).json(data);
    })
    .catch(function(error){
        res.status(500).json({message:error.message});
    })
})

///delete
///findone 
//deleteOne
//updateOne

router.delete('/deleteuser/:id',auth.verifyLogin,auth.verifyAdmin,function(req,res){
    const id2=req.params.id;//params
    User.deleteOne({_id:id2}).then(function(result){
        res.status(200).json({message:"delete successful"})
    })
    .catch(function(error){
        res.status(500).json({message:error.message})
        console.log(error);
    })


})

//update
router.put('/updateOne/:id',auth.verifyLogin,auth.verifyAdmin,function(req,res){
    const email1=req.body.email;
    const password1=req.body.password;
    const username1=req.body.username;
    const id=req.params.id;
    const userType1=req.body.userType;
//database ma change garna khojeko
    User.updateOne({_id:id},{email:email1,password:password1,username:username1,userType:userType1}).then(function(result){
        res.status(200).json({message:"update successful"})
    })
    .catch(function(error){
        res.status(500).json({message:error.message})
    })
})


router.put('/logout',auth.verifyLogin,function(req,res){
    const token=req.headers.authorization;
    jwt.sign(token,"",{expiresIn:1},(logout,err)=>{
        if(logout){
            res.status(200).json({message:"logout successful"})
        }
        else{
            res.status(500).json({err:"logout failed"})
        }
    })
})



module.exports =router;