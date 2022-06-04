import { Types, Schema, model } from 'mongoose';

const userSchema={
    name:{type:String},
    phone_number:{type:String},
    email:{type:String},
    age:{type:String},
    profile_image:{type:String},
    date_of_birth:{type:Date},
    gender:{type:String},
    description:{type:String},
    location:{
        type:{
            type:String,
            default:"Point"
        },
        address:{type:String},
        coordinates:[Number]
    },
    followers:[{
        id:Types.ObjectId,
    }],
    following:[{
        id:Types.ObjectId,
    }],
    likes:[{
        id:Types.ObjectId,
    }],
    comments:[{
        id:Types.ObjectId,
    }]
};
Schema(userSchema);
const UserModel=model("User",userSchema);

export default UserModel;
