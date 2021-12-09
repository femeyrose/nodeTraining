const { TestWatcher } = require("@jest/core");
const request =require("supertest")
const app="localhost:5000";

describe("login flow testing",()=>{

    // success flow
    // failure
    // password field not present
    
   test("registration success",async()=>{
    const response=await request(app)
    .post("/user/saveForm")
    .send({email:"femey@test.com",password:"123456",firstName:"femey",LastName:"rose",phone:"123456"})
    expect(response.statusCode).toBe(200)  
   })

   test("registration fail for empty password",async()=>{
    const response=await request(app)
    .post("/user/saveForm")
    .send({email:"femey@test.com",password:"",firstName:"femey",LastName:"rose",phone:"123456"})
    expect(response.statusCode).toBe(400)  
   })




     


})
