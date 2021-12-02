const express = require('express')
const UserModel = require('../model/user')
const loginValidation = require('../schema/validation')
const signUpValidation = require('../schema/signupValidation')
const bcrypt = require('bcrypt');

const router = express.Router()


router.get('/signup', (req, res) => {
    res.render('signup', { title: 'new user signup screen' })
})

router.post('/saveForm', async (req, res) => {
    console.log(req.body)
    // sign up 
    // get req, connect to db , prepare insert query,insert the data, if success
    // return sucess else error

    const valid = signUpValidation(req.body)
    // console.log(valid.error.details)
    if (valid.error) {
        res.render('signup', { message: valid.error.details[0].message })
    }

    try {
        const result = await UserModel.saveNewUser(req.body)
        res.render('signup', { title: 'new user signup screen', message: 'success' })
    } catch (error) {
        console.log(error)
        res.render('signup', { title: 'new user signup screen', message: 'fail' })
    }


})

router.get('/login', (req, res) => {
   
    res.render('login')
})

//midleware:


router.post('/login', async (req, res) => {
   
    const valid = loginValidation(req.body)
    try {
        console.log(valid)
        if (valid.error) {
            res.render('login', { message: valid.error.details[0].message })
        }

        //check user with email, password matches with password in db
        // respond
        else {
            const result = await UserModel.getUserByEmailID(req.body)
   

            if (result.length) {
              
                
                const isValidPassword = await bcrypt.compare(req.body.password, result[0].password)
            //  result[0].password , password is the name of the column in db
                if (isValidPassword) {
                   
                    req.session.userID=result[0].id;
                    res.redirect('/articles')
                    // res.render('add_article', { message: 'New user added' })
                }
                else {
                    res.render('login', { message: 'invalid password' })
                }
            }
            else {
                res.render('login', { message: `user with ${req.body.email} not found` })
            }


        }
    }
    catch (error) {
        console.log(error)
        res.render('login', { message: 'login failed' })
    }
})


module.exports = router;