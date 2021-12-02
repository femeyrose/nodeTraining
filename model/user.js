const mysql=require('mysql2')
const connectionStr=require('../config/dbConfig')
const bcrypt =require('bcrypt');
let UserModel = {}

UserModel.getAll = ()=>{
    // connection code to db
    return UserModel
}

UserModel.saveNewUser=(userParams)=>{
    return new Promise(async(resolve,reject)=>{

    // hash user password in db we use bcrypt for this while registering
    const salt=10  //no.of times that hashes
    const password_hash=await bcrypt.hash(userParams.password,salt)
    console.log("userparams.password"+userParams.password)
    console.log("password hash"+password_hash)

  
// connection code to db
const connection=mysql.createConnection(connectionStr)
console.log(connectionStr)
const queryStr=`INSERT INTO projectdb.user (first_name, last_name, email, 
    phone_number, password, status, created_at) VALUES ('${userParams.firstName}', '${userParams.lastName}',
     '${userParams.email}',
     '${userParams.phone}', '${password_hash}','1', 'NOW()');`;
connection.query(queryStr,function(err,results,fields){
    // console.log(`error:${err}`)
    // console.log(`results:${results}`)
    // console.log(`fields:${fields}`)

    if(err){
        console.log(err)
        reject(err)
    }
    else{
        resolve(results)
    }
})
})

}

UserModel.getUserByEmailID=(userData)=>{
    return new Promise((resolve,reject)=>{
        // creating a db connection
        // run query db with the user email
        const connection=mysql.createConnection(connectionStr)
        const queryStr=`SELECT * FROM projectdb.user where email='${userData.email}'`
        console.log(queryStr);
        connection.query(queryStr,
            function(err,result,fields){
                if(err) reject(err)
                else resolve(result)
            })
    
    })
}



module.exports = UserModel