const exp=require('express')
const app=exp();
const mongoClient=require('mongodb').MongoClient
require('dotenv').config() //imported dotenv
const path=require('path')

//deploy react build in this server



//to parse the body of req
app.use(exp.json())

//database connection
mongoClient.connect(process.env.URL)
.then(client=>{
    const dbobj=client.db('blogdb')
    const usercollectionobj=dbobj.collection('userscollection')
    const authorcollectionobj=dbobj.collection('authorscollection')
    const articlecollectionobj=dbobj.collection('articlescollection')
    app.set('authorcollection',authorcollectionobj)
    app.set('usercollection',usercollectionobj)
    app.set('articlecollection',articlecollectionobj)
})
app.use(exp.static(path.join(__dirname,'../client/build')))

//importing APIs
const userApp=require('./Api/user-api')
const authorApp=require('./Api/author-api')
const adminApp=require('./Api/admin-api');
const { MongoClient } = require('mongodb');

//sending requests to apis using paths of url
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

// error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:err.message})
})
// Assigning port number
const port=process.env.PORT||5000;
app.listen(port,()=>console.log('Server running on',port))