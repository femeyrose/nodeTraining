const express = require('express')
const UserModel=require('../model/user')

const router = express.Router()


router.get('/signup', (req, res)=> {
    res.render('signup',{title:'new user signup screen'})
})

router.post('/saveForm',async (req,res)=>{
    console.log(req.body)
    // sign up 
    // get req, connect to db , prepare insert query,insert the data, if success
    // return sucess else error
   
    try {
        const result= await UserModel.saveNewUser(req.body)
        res.render('signup',{title:'new user signup screen',message:'success'})
    } catch (error) {
        console.log(error)
        res.render('signup',{title:'new user signup screen',message:'fail'}) 
    }
})

module.exports = router;