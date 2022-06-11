import ResponseHandler from "./../middleware/responseHandler.js"
import userValidator from "../validators/userValidator.js";
import UserModel from "./../models/user.js";
import securedPassword from "../middleware/securePassword.js";
import Authentication from "../middleware/auth.js";
import mongoose from "mongoose"
const User = {
    async test(req, res, next) {
        return res.send("Api is running....");
    },
    async register(req, res, next) {

        try {
            var userData = await UserModel.findOne({ email: req.body.email }).select({ email: 1 });
            console.log(userData)
            if (userData && userData["_id"]) {
                return res.send(ResponseHandler.failureResponse(false, "Already Exists"));
            }
            else {

                const user = {
                    name: req.body.name,
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    age: req.body.age,
                    gender: req.body.gender,
                    description: req.body.description,
                    password: req.body.password
                }
                console.log("user", user);
                var validatedData = await userValidator(user);
                if (validatedData.error) {
                    next(validatedData.error);
                }
                else {
                    try {
                        user.password=await securedPassword.hashPassword(req.body.password);
                        var userDoc = await UserModel.create(user);
                        var token=await Authentication.createToken(userDoc._id);
                        console.log("userDoc", userDoc);
                        return res.send(await ResponseHandler.successResponse("User created successfully", userDoc,token));
                    }
                    catch (err) {
                        next(err);
                    }
                }

            }
        }
        catch (err) {
            console.log("------------");
            next(err);
        }

    },
    async login(req,res,next){
        try{
            var userData=await UserModel.findOne({email:req.body.email});
            if(userData){
                var isCorrectPassword=securedPassword.comparePassword(req.body.password,userData.password);
                if(isCorrectPassword){
                    var token=await Authentication.createToken(userData._id);
                    return res.send(await ResponseHandler.successResponse("Logged in successsfully",userData,token))
                }
                else{
                    return res.send(await ResponseHandler.failureResponse("Password is Incorrect!"))
                }
            }
            else{
                return res.send(await ResponseHandler.failureResponse("Account Doesn't Exist Kindly Singnup"));
            }
        }
        catch(err){
            next(err);
        }
    },
    async updatePassword(req,res,next){
        try{
            const userData=await UserModel.findById(req.user.userId);
            const isCorrectPassword=securedPassword.comparePassword(req.body.oldPassword,userData.password);
            console.log("request",req.user);
            if(isCorrectPassword){
                console.log("password is correct")
                if(req.body.newPassword==req.body.confirmPassword){
                    var encryptedPassword=await securedPassword.hashPassword(req.body.newPassword)
                    const updatedUserDoc=await UserModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.user.userId)},{"$set":{"password":encryptedPassword}},{new:true})
                    return res.send(await ResponseHandler.successResponse("Password Updated successfully",updatedUserDoc));
                }
                else{
                    return res.send(ResponseHandler.failureResponse("New Password and Confirm Password must be the same")); 
                }
            }
            else{
                console.log("password is wrong")
                return res.send(ResponseHandler.failureResponse("Please Enter Correct Password"));
            }

        }
        catch(err){
            next(err);
        }
    },
    async forgotPassword(req,res,next){
        
    }
}
export default User