const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const bodyParser=require('body-parser')
const userDB=require('../models/user');
const bcrypt=require('bcrypt')
const jsonwebtoken=require('jsonwebtoken');

router.post('/signup',(req,res,next)=>{
    userDB.find({email:req.body.email}).
    exec().
    then(doc=>{
        if(doc.length>=1){
           return res.status(409).json({
                message:"User is already present"
            })
        }else{
            bcrypt.hash(req.body.password,10,function(err,hash){

                if(err){
                    res.status(200).json({
                        error:err
                    })
                }else{
                    const UserDetails=new userDB({
                        _id:new mongoose.Types.ObjectId,
                        email:req.body.email,
                        password:hash
                    });
                    UserDetails.save().then(result=>{
                        console.log(result);
                        res.status(200).json({
                            message:"Registernation successful"
                        })
                    }).catch(err=>{
                        console.log(err);
                        res.status(500).json({
                        message:"Something went wrong"
                    })})
                    
                }
            });
        }
    })
    
});
router.post('/login',function(req,res,next){
    const email=req.body.email;
    const password=req.body.password;
    userDB.find({email:email}). exec().then(user=>{

        console.log(user);
        if(user.length<1){
            return res.status(404).json({
                message:"Invalid Users"
            })
        }else{
            bcrypt.compare(password,user[0].password,function(err,result){
                if(err){
                    console.log(err);
                  return  res.status(404).json({
                        message:"Inavlid Password"
                    });
                }
                if(result){
                    console.log( process.env.JWT_KEY)
                  const token= jsonwebtoken.sign
                  (
                        {
                         email:user[0].email,
                         userId:user[0]._id,
                        },
                        "secret",
                        //process.env.JWT_KEY,
                       {
                        expiresIn:"1h"
                       }
                 );
                    
                return res.status(200).json({
                      
                        message:"login Successful",
                        token:token
                    });
                }else{
                    res.status(200).json({
                        message:"Invalid Password"
                    })
                }

            })
        }
    }).
    catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});
router.delete('/:userId',(req,res,next)=>{
    userDB.remove({_id:req.params.userId}).
    exec().then(
        err=>{
            console.log(err);
            res.status(200).json({
               message:"User is deleted Successfully"
            })
        }
    ).catch(
        err=>{
            console.log(err);
            res.status(200).json({
                error:err
            })
        }
    )
})
module.exports=router;