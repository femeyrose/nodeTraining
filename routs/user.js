const express = require('express')
const UserModel=require('../model/user')
const loginValidation = require('../schema/validation')
const signUpValidation = require('../schema/signupValidation')

const router = express.Router()


router.get('/signup', (req, res)=> {
    res.render('signup',{title:'new user signup screen'})
})

router.post('/saveForm',async (req,res)=>{
    console.log(req.body)
    // sign up 
    // get req, connect to db , prepare insert query,insert the data, if success
    // return sucess else error

    const valid=signUpValidation(req.body)
    // console.log(valid.error.details)
    if(valid.error){
     res.render('signup',{message:valid.error.details[0].message})
    } 
   
    // try {
    //     const result= await UserModel.saveNewUser(req.body)
    //     res.render('signup',{title:'new user signup screen',message:'success'})
    // } catch (error) {
    //     console.log(error)
    //     res.render('signup',{title:'new user signup screen',message:'fail'}) 
    // }


})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login',async(req,res)=>{
   console.log(req.body)
   const valid=loginValidation(req.body)
   console.log(valid)
   if(valid.error){
    res.render('login',{message:valid.error.details[0].message})
   }

//check user with email, password matches with password in db
// respond
try {
    const result=await UserModel.getUserByEmailID(req.body)
    console.log(result)
    // validation
    // password and email not empty and is valid
    // let error=''
    // if(req.body.email.length==0){
    //  //error
    //  error+='email is required'
    // }
    // else if(req.body.password.length==0){
    //  error+='password cannot be empty'
    // }

    // if(error.length>0){
    //     res.render('login',{message:error})
    // }

    

    if(result[0].password===req.body.password){
        res.render('add_article')
    }
    else{
        res.render('login',{message:'invalid password'})
    }
   
} catch (error) {
    console.log(error)
    res.render('login',{message:'login failed'})
}
})


module.exports = router;