require('dotenv').config()
const jsonwebtoken=require('jsonwebtoken')
//Token verification
function verifyToken(req,res,next){
    //get bearer token from headers of request
    const bearerToken=req.headers.authorization
    //if token is not available
    if(!bearerToken){
        res.send({message:"Unauthorized request.plz login to continue"})
    }
    //extract token from bearer token
    const token=bearerToken.split(' ')[1]
    try{
        let decodedToken=jsonwebtoken.verify(token,process.env.SECRET_KEY)
        next()
    }
    catch(err){
        next(err);
    }
}

module.exports=verifyToken;