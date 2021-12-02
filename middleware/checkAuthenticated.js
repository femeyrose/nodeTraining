const checkAuthenticated=(req,res,next)=>{
//if session is set GO to articles screen
// if not go back to login
if(!req.session.userID){
    console.log(req.session)
    res.redirect('/login')
}

else{
    next()
}
}

module.exports=checkAuthenticated;