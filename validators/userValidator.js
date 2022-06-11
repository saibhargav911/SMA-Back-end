import joi from "joi";
const userValidator=async (user)=>{
    const joiSchema=joi.object({
        name:joi.string().min(5).max(20).required(),
        phone_number:joi.string().max(10).pattern(/^[0-9]+$/).optional(),
        email:joi.string().email().required(),
        age:joi.string().min(1).max(3).optional(),
        gender:joi.string().valid("Male","Female"),
        password:joi.string().max(20).required(),//Regex validation to be done 1 Special character, 1 upper case, 1number
        description:joi.string().min(10).max(100)
    });
    return joiSchema.validate(user)
}
export default userValidator;