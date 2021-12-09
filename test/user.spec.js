const { TestWatcher } = require("@jest/core");
const request =require("supertest")
const app="localhost:5000";

describe("login flow testing",()=>{

    // validation is happeneing
    // user exits checking
    // success flow: if username and password is correct
    // false case: credentials wrong
    // test if no i/p is given
    // test wrong email and correct password
    // test correct email and wrong password
    
   test("login success",async()=>{
       const response=await request(app)
       .post("/user/login")
       .send({email:"femey1@test.com",password:"1234"});
       expect(response.statusCode).toBe(302)
   })

   test('login with wrong credentials',async()=>{
       const response=await request(app)
       .post("/user/login")
       .send({email:"wrong@test.com",password:"wrong password"})
       expect(response.statusCode).toBe(400)
    })

    test('login validation',async()=>{
        const response=await request(app)
        .post("/user/login")
        .send({email:"wrong",password:"1"})
        expect(response.statusCode).toBe(400)
     })

     test('empty',async()=>{
        const response=await request(app)
        .post("/user/login")
        .send({email:"",password:""})
        expect(response.statusCode).toBe(400)
     })


})
