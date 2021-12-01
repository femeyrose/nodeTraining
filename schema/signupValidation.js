const Joi =require('joi');


const signUpValidation=(val)=>{
    const schema =Joi.object({
        email:Joi.string().min(6),
        password:Joi.string().min(4),
        firstName:Joi.string().min(4),
        LastName:Joi.string().min(4),
        phone:Joi.string().min(4)
    })
return schema.validate(val)
}

module.exports=signUpValidation;
