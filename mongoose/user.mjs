import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    displayName:String,
    age:mongoose.Schema.Types.Int32,
    password:{
        type:String,
        required:true
    }
});

export const User = mongoose.model("User",UserSchema);
