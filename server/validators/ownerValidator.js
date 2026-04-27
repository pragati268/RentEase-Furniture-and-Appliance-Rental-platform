import joi from "joi";  

const ownerValidatorSchema = joi.object({
    fullname: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

export default ownerValidatorSchema;