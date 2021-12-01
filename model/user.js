const mysql=require('mysql2')
const connectionStr=require('../config/dbConfig')
let UserModel = {}

UserModel.getAll = ()=>{
    // connection code to db
    return UserModel
}

UserModel.saveNewUser=(userData)=>{
    return new Promise((resolve,reject)=>{

  
// connection code to db
const connection=mysql.createConnection(connectionStr)
console.log(connectionStr)
const queryStr=`INSERT INTO projectdb.user (first_name, last_name, email, 
    phone_number, password, status, created_at) VALUES ('${userData.firstName}', '${userData.lastName}', '${userData.email}',
     '${userData.phone}', '${userData.password}','1', 'NOW()');`;
connection.query(queryStr,function(err,results,fields){
    // console.log(`error:${err}`)
    // console.log(`results:${results}`)
    // console.log(`fields:${fields}`)

    if(err){
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