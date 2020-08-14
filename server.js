const express=require('express')
const app=express()
const articleRoutes=require('./routes/article.js')
const Article=require('./models/article.js')
const mongoose=require("mongoose")
const methodOverride=require('method-override')
const bodyParser = require('body-parser')

mongoose.connect("mongodb://localhost/test", { useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex:true })
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get('/',async (req,res)=>{
    const article=await Article.find().sort({createdAt:'desc'})
    res.render('article/index',{article:article});
})

app.use('/article',articleRoutes)

app.listen(3000,()=>{
    console.log("server is listening at 3000");
})

