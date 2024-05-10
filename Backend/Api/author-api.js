const exp = require('express')
const bcryptjs=require('bcryptjs')
const jsonwebtoken=require('jsonwebtoken')
const authorApp = exp.Router()
const verifyToken=require("../middlewares/verifyToken")
const expressAsyncHandler = require('express-async-handler')
require('dotenv').config()
authorApp.use(exp.json())

//author collection object
authorApp.use((req,res,next)=>{
    authorcollection=req.app.get('authorcollection')
    articlecollection=req.app.get('articlecollection')
    next();
});

authorApp.get('/author',expressAsyncHandler(async(req,res)=>{
    const authorlist=await authorcollection.find().toArray()
    res.send({message:'All authors',payload:authorlist})
}))

authorApp.get('/author/:username',expressAsyncHandler(async(req,res)=>{
    //get author name from url
    const authorNameFromurl=req.params.username;
    //find author details by author name
    const authorlist=await authorcollection.find({username:authorNameFromurl}).toArray()
    res.send({message:'All authors',payload:authorlist})
}))

//author registration 
authorApp.post('/author',expressAsyncHandler(async(req,res)=>{
    // get user resource from req
    const newauthor=req.body;
    // check duplicate user by username
    const dbauthor=await authorcollection.findOne({username:newauthor.username})
     // if author already existed
    if(dbauthor!==null){
        res.send({message:'username already taken'})
    }
    else{
        // hashing password
        let hashedpassword=await bcryptjs.hash(newauthor.password,6)
          // replace plain password with hashed password
        newauthor.password=hashedpassword
         // save author
        await authorcollection.insertOne(newauthor)
        // send response
        res.send({message:"author Created"})
    }
}))

//author login
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    // get author resource from req
    const authorcredobj=req.body;
    // verify author
    const dbauthor=await authorcollection.findOne({username:authorcredobj.username})
    // if author is not present
    if(dbauthor===null){
        res.send({messsage:'Invalid username'})
    }
    else{
        // if author is valid
        let status=await bcryptjs.compare(authorcredobj.password,dbauthor.password)
        // if password is not matched
       if(status===false){
        res.send({message:"Invalid Passsword"})
       }
       else{
        // if passswords are matched create jwt token
        const signedToken=jsonwebtoken.sign({authorname:dbauthor.authorname},process.env.SECRET_KEY,{expiresIn:'1d'})
        // send token to client as res
        res.send({message:"Login success",token:signedToken,user:dbauthor})
       }
    }
}))

//adding new article
authorApp.post('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get new article by author
    const newArticle=req.body;
    //post to articles collection
    await articlecollection.insertOne(newArticle)
    //send res
    res.send({message:"New article created"})
}))

//modify article by author
authorApp.put('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get modified article from client
    const modifiedArticle=req.body;
    //update article by article id
    const result=await articlecollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    let latestArticle=await articlecollection.findOne({articleId:modifiedArticle.articleId})
    //send res
    res.send({message:"Article Modified",article:latestArticle})
}))


// soft delete
authorApp.put('/articles/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get articleId from url
    const articleIdFromUrl=(+req.params.articleId);
    // get article
    const articleToDelete=req.body
    //delete
    if(articleToDelete.status===true){
        //update status of article to false
        let modifiedArticle=await articlecollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
        //send res
        res.send({message:"Article removed",payload:modifiedArticle.status})
    }
    if(articleToDelete.status===false){
        //update status of article to false
        let modifiedArticle=await articlecollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        //send res
        res.send({message:"Article restored",payload:modifiedArticle.status})
        }
}))

//Accessing articles by username
authorApp.get('/articles/:name',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get articles collection from express app
    const articlecollection=req.app.get('articlecollection')
    // get username
    const User=req.params.name
    // get all articles
    let articleList=await articlecollection.find({$and:[{username:User}]}).toArray()
    // send res
    res.send({message:"List of Articles",payload:articleList})
}))


module.exports=authorApp