const jwt = require('jsonwebtoken');

const authentication=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        try {
            const decoded=jwt.verify(token,"masai")
            req.body.userID=decoded.userID
                next()
        }
        catch (error) {
            console.log(error)
                res.send("Please Login First.")
        }
    }else{
        res.send("Please Login First.")
    }
}
module.exports={
    authentication
}
