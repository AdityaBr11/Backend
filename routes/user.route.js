const express=require('express');
const {UserModel}=require('../models/user.model');

const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

const userRouter=express.Router();
userRouter.use(express.json());

// userRouter.get("/",(req,res)=>{
//     res.send("sucess")
// })

userRouter.post("/register",async(req,res)=>{
    const payload=req.body
    try{
        const user=new UserModel(payload);
        await user.save()
        res.send({"Success":"Register Successful"})
        console.log('register successful')
    }catch(err){
        console.log(err)
        res.send({"Error":'User already exist'})
    }
})

userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email,password})
        // console.log(user)
        const token = jwt.sign({ name: 'aditya' }, 'masai');
        if(user.length>0){
            res.send({"success":user,"token":token});
        }else{
            res.send({"Error":"not valid user"})
        }

    }catch(err){
        console.log(err)
        res.send("not valid user")
    }
})

module.exports={
    userRouter
}
