const express=require('express')
const router=express.Router()
const Article=require('../models/article.js')

router.get("/new",(req,res)=>{
    res.render('article/new',{article:new Article()})
})


router.get("/edit/:id",async (req,res)=>{
    const article=await Article.findById(req.params.id)
    res.render('article/edit',{article:article})
})


router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
  }, saveArticleAndRedirect('edit'))
  

router.get('/:slug',async (req,res)=>{
    const article=await Article.findOne({slug:req.params.slug})
    if(article==null) res.redirect('/')
    res.render('article/show',{article:article})
})

router.post('/', async (req, res, next) => {
    
    req.article = new Article()
    next()
  }, saveArticleAndRedirect('new'))
  

router.delete('/:id',async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


function saveArticleAndRedirect(path) {
    return async (req, res) => {
      let article = req.article
      article.title = req.body.title
      article.description = req.body.description
      article.markdown = req.body.markdown
      try {
        article = await article.save()
        res.redirect(`/article/${article.slug}`)
      } catch (e) {
        res.render(`article/${path}`, { article: article })
      }
    }
  }

module.exports=router