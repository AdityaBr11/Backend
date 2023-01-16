const express=require("express")
const { PostModel } = require("../models/post.model")

const postRouter=express.Router()

postRouter.get("/",async(req,res)=>{
    let userID=req.body.userID
    let data=await PostModel.find({userID})
    res.send(data)
})

postRouter.post("/",async(req,res)=>{
    let data=req.body
    let Post=new PostModel(data)
    await Post.save()
    res.send("Added SuccessFully")
})

postRouter.patch("/update/:id",async(req,res)=>{
    let id=req.params.id
    let data=req.body
    let userData=await PostModel.find({_id:id})
    if(userData[0].userID=data.userID){
        await PostModel.findByIdAndUpdate(id,data)
        res.send("Updated Succesfully")
    }else{
        res.send("You cannot modify the data.")
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id
    let userData=await PostModel.find({_id:id})
    if(userData[0].userID==req.body.userID){
        await PostModel.findByIdAndDelete(id)
        res.send("Deleted Succesfully.")
    }else{
        res.send("You can't delete this route.")
    }
})

module.exports={
    postRouter
}