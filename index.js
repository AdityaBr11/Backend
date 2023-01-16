const express=require('express');
const cors=require('cors');
require("dotenv").config()

const {connection}=require("./config/db");
const {userRouter}=require("./routes/user.route");
const {postRouter}=require("./routes/post.route")
const {authentication}=require("./middleware/auth.midleware")

const app=express();

app.use(cors({
    origin:"*"
}));

app.use("/user",userRouter);
app.use(authentication)
app.use("/post",postRouter)


app.listen(process.env.port, async ()=>{
    try{
        await connection
        console.log('connected to DB')
    }catch(err){
        console.log(err)
    }
    console.log(`server is running at port ${process.env.port}`)
})