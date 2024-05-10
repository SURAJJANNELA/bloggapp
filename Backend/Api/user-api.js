const exp = require('express')
const bcryptjs=require('bcryptjs')
const jsonwebtoken=require('jsonwebtoken')
const expressAsyncHandler=require('express-async-handler')
const userApp = exp.Router()
const verifyToken=require("../middlewares/verifyToken")
require('dotenv').config()
userApp.use(exp.json())

//user collection object
userApp.use((req,res,next)=>{
    usercollection=req.app.get('usercollection')
    articlecollection=req.app.get('articlecollection')
    next();
});
// get all users
userApp.get('/user',expressAsyncHandler(async(req,res)=>{
    const userslist=await usercollection.find().toArray()
    res.send({message:'All users',payload:userslist})
}))

//user registration 
userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    // get user resource from req
    const newuser=req.body;
    // check duplicate user by username
    const dbuser=await usercollection.findOne({username:newuser.username})
    // if user already existed
    if(dbuser!==null){
        res.send({message:'User already taken'})
    }
    else{
        // hashing password
        let hashedpassword=await bcryptjs.hash(newuser.password,6)
        // replace plain password with hashed password
        newuser.password=hashedpassword
        // save user
        await usercollection.insertOne(newuser)
        // send response
        res.send({message:"User Created"})
    }
}))

//user login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    // get user resource from req
    const usercredobj=req.body;
    // verify user
    const dbuser=await usercollection.findOne({username:usercredobj.username})
    // if user is not present
    if(dbuser===null){
        res.send({messsage:'Invalid Username'})
    }
    else{
        // if user is valid
        let status=await bcryptjs.compare(usercredobj.password,dbuser.password)
        // if password is not matched
       if(status===false){
        res.send({message:"Invalid Passsword"})
       }
       else{
        // if passswords are matched create jwt token
        const signedToken=jsonwebtoken.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
        // send token to client as res
        res.send({message:"Login success",token:signedToken,user:dbuser})
       }
    }
}))

//writing comments to article by articleId
userApp.post('/comment/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const articleIdfromurl=(+req.params.articleId)
    //get comments object
    const userCommentObj=req.body;
    //insert users comment obj to comments array of article by id
    let result=await articlecollection.updateOne({articleId:articleIdfromurl},{$addToSet:{comments:userCommentObj}})
    let latestArticle=await articlecollection.findOne({articleId:articleIdfromurl})
    console.log(result)
    res.send({message:"comment posted",payload:latestArticle})
}))


//getting all Articles of authors
userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get all articles
    let articles=await articlecollection.find({status:true}).toArray()
    // send res
    res.send({message:"List of Articles",payload:articles})
}))

module.exports=userApp