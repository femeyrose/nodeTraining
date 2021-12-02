const express = require('express')
const path = require('path');
const session=require('express-session');
const app = express()
const PORT = process.env.PORT || 5000;

// set view engine 
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded())
app.use(session({
    name:'sid',
    saveUninitialized:false,
    resave:false,
    secret:'some long random string should come here',
    cookie:{
         maxAge:1000*60*60*2,
         sameSite:true,
         secure:process.env.NODE_ENV==='production'
         }
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/members', require('./routs/api/member'))
app.use('/articles', require('./routs/articles'))

app.use('/user',require('./routs/user'))


app.listen(PORT, () => console.log(`server stated on port ${PORT}`))