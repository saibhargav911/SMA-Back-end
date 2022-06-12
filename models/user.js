import mongoose from 'mongoose'

const userSchema={
    name:{type:String},
    phone_number:{type:String},
    email:{type:String},
    age:{type:String},
    profile_image:{type:String},
    date_of_birth:{type:Date},
    gender:{type:String},
    description:{type:String},
    password:{type:String},
    location:{
        type:{
            type:String,
            default:"Point"
        },
        address:{type:String},
        coordinates:[Number]
    },
    academics:[{
        type:{type:String},
        location:{type:String},
        from:{type:Date},
        to:{type:Date},
        institution_name:{type:String},
        Role:{type:String}
    }],
    followers:[{
        id:mongoose.Types.ObjectId,
    }],
    following:[{
        id:mongoose.Types.ObjectId,
    }],
    likes:[{
        id:mongoose.Types.ObjectId,
    }],
    comments:[{
        id:mongoose.Types.ObjectId,
    }]
};
mongoose.Schema(userSchema);
const UserModel=mongoose.model("User",userSchema);

export default UserModel;
