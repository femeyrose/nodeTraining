const express = require('express')

// DATA source
const Articles = require('../model/article')

const checkAuthenticated=require('../middleware/checkAuthenticated')
const router = express.Router()

// GET all articles 
router.get('/',checkAuthenticated,(req, res)=>{
    const result = Articles.getAll()
    res.render('index',{title:'All Articles', articles:result}) //index.pug==>index
})

router.get('/add', (req,res) => {
    res.render('add_article', {title:'add view'})
})

router.get('/saveForm', (req, res)=> {
    res.send(req.query)
})

module.exports = router;